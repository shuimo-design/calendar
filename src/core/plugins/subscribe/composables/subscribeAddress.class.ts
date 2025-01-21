/**
 * @description
 * @author 阿怪
 * @date 2025/1/21 21:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export type SubscribeAddressType = {
  name?: string;
  active?: boolean;
  color?: string;
}

export class SubscribeAddress {

  name?: string;
  active?: boolean;
  color?: string;
  _agendas: MCalendarAgenda[] = [];

  constructor(options: SubscribeAddressType, agendas?: MCalendarAgenda[]) {
    this.name = options.name;
    this.active = options.active;
    this.color = options.color;
    if (agendas) {
      this._agendas = agendas;
    }
  }


  get agendas() {
    return this._agendas.map((agenda) => ({
      color: this.color,
      info: { msg: this.name },
      ...agenda,
    }));
  }

  set agendas(agendas: MCalendarAgenda[]) {
    this._agendas = agendas;
  }

}
