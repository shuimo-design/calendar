import { CalendarEvent, DateInfo, CalendarView } from './types';
import { ref, watch } from 'vue';

/**
 * 日历核心API接口
 */
export interface CalendarAPI {
  // 视图操作
  setView(view: CalendarView): void;
  getView(): CalendarView;

  // 日期操作
  setCurrentDate(date: Date): void;
  getCurrentDate(): Date;
  goToNextPeriod(): void;
  goToPrevPeriod(): void;
  goToToday(): void;

  // 事件操作
  addEvent(event: CalendarEvent): void;
  updateEvent(eventId: string, event: Partial<CalendarEvent>): void;
  deleteEvent(eventId: string): void;
  getEvents(start?: Date, end?: Date): CalendarEvent[];

  // 获取日期信息
  getDateInfo(date: Date): DateInfo;

  // 监听器
  onViewChange(callback: (view: CalendarView) => void): () => void;
  onDateChange(callback: (date: Date) => void): () => void;
  onEventChange(callback: (events: CalendarEvent[]) => void): () => void;
}

/**
 * 创建日历API实例
 */
export function createCalendarAPI(): CalendarAPI {
  const currentView = ref<CalendarView>('month');
  const currentDate = ref(new Date());
  const events = ref<CalendarEvent[]>([]);

  const viewListeners = ref<((view: CalendarView) => void)[]>([]);
  const dateListeners = ref<((date: Date) => void)[]>([]);
  const eventListeners = ref<((events: CalendarEvent[]) => void)[]>([]);

  // 视图操作
  const setView = (view: CalendarView) => {
    currentView.value = view;
    viewListeners.value.forEach(listener => listener(view));
  };

  const getView = () => currentView.value;

  // 日期操作
  const setCurrentDate = (date: Date) => {
    currentDate.value = date;
    dateListeners.value.forEach(listener => listener(date));
  };

  const getCurrentDate = () => currentDate.value;

  const goToNextPeriod = () => {
    const date = new Date(currentDate.value);
    switch (currentView.value) {
      case 'year':
        date.setFullYear(date.getFullYear() + 1);
        break;
      case 'month':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'week':
        date.setDate(date.getDate() + 7);
        break;
      case 'day':
        date.setDate(date.getDate() + 1);
        break;
    }
    setCurrentDate(date);
  };

  const goToPrevPeriod = () => {
    const date = new Date(currentDate.value);
    switch (currentView.value) {
      case 'year':
        date.setFullYear(date.getFullYear() - 1);
        break;
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'day':
        date.setDate(date.getDate() - 1);
        break;
    }
    setCurrentDate(date);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 事件操作
  const addEvent = (event: CalendarEvent) => {
    events.value.push(event);
    eventListeners.value.forEach(listener => listener(events.value));
  };

  const updateEvent = (eventId: string, eventData: Partial<CalendarEvent>) => {
    const index = events.value.findIndex(e => e.id === eventId);
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...eventData };
      eventListeners.value.forEach(listener => listener(events.value));
    }
  };

  const deleteEvent = (eventId: string) => {
    const index = events.value.findIndex(e => e.id === eventId);
    if (index !== -1) {
      events.value.splice(index, 1);
      eventListeners.value.forEach(listener => listener(events.value));
    }
  };

  const getEvents = (start?: Date, end?: Date) => {
    if (!start && !end) return events.value;

    return events.value.filter(event => {
      if (start && end) {
        return event.start >= start && event.end <= end;
      } else if (start) {
        return event.start >= start;
      } else if (end) {
        return event.end <= end;
      }
      return true;
    });
  };

  // 获取日期信息
  const getDateInfo = (date: Date): DateInfo => {
    const today = new Date();
    const isToday = date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isOtherMonth = date.getMonth() !== currentDate.value.getMonth();

    return {
      date,
      isToday,
      isWeekend,
      isOtherMonth
    };
  };

  // 监听器
  const onViewChange = (callback: (view: CalendarView) => void) => {
    viewListeners.value.push(callback);
    return () => {
      const index = viewListeners.value.indexOf(callback);
      if (index !== -1) {
        viewListeners.value.splice(index, 1);
      }
    };
  };

  const onDateChange = (callback: (date: Date) => void) => {
    dateListeners.value.push(callback);
    return () => {
      const index = dateListeners.value.indexOf(callback);
      if (index !== -1) {
        dateListeners.value.splice(index, 1);
      }
    };
  };

  const onEventChange = (callback: (events: CalendarEvent[]) => void) => {
    eventListeners.value.push(callback);
    return () => {
      const index = eventListeners.value.indexOf(callback);
      if (index !== -1) {
        eventListeners.value.splice(index, 1);
      }
    };
  };

  return {
    setView,
    getView,
    setCurrentDate,
    getCurrentDate,
    goToNextPeriod,
    goToPrevPeriod,
    goToToday,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getDateInfo,
    onViewChange,
    onDateChange,
    onEventChange
  };
}
