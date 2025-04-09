/**
 * @description
 * @author 阿怪
 * @date 2025/1/17 02:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

interface ICALAgendaInfo {
  msg?: string;
}

export default function useSubscribe(){

  const parseICalendarData = (icalData: string): MCalendarAgenda[] => {
    const eventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
    const events: MCalendarAgenda[] = [];
    let match;
    while ((match = eventRegex.exec(icalData)) !== null) {
      const eventData = match[1];

      const startMatch = eventData.match(/DTSTART;VALUE=DATE:(\d{8})/);
      const endMatch = eventData.match(/DTEND;VALUE=DATE:(\d{8})/);
      const summaryMatch = eventData.match(/SUMMARY;LANGUAGE=zh_CN:(.*?)\n/);

      if (startMatch ) {
        const startDate = startMatch[1];
        const start = new Date(`${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`);
        let end = start;
        if( endMatch){
          const endDate = endMatch[1];
          const end = new Date(`${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`);
          end.setDate(end.getDate() - 1);
        }

        const info: ICALAgendaInfo = {
          msg: summaryMatch ? summaryMatch[1] : undefined,
        };

        // 将日期字符串转换为 Date 对象


        events.push({
          start,
          end,
          info: Object.keys(info).length > 0 ? info : undefined,
          color: '#E4B8D5'
        });
      }
    }
    console.log(events);

    return events;
  };


  return {
    parseICalendarData
  }

}
