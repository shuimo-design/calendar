/**
 * @description
 * @author 阿怪
 * @date 2025/1/21 21:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SubscribeAddress, SubscribeAddressType } from '../core/plugins/subscribe/composables/subscribeAddress.class.ts';


export class JanghoodSubscribe extends SubscribeAddress {

  url: string;

  constructor(options: SubscribeAddressType & { url: string; }, agendas: MCalendarAgenda[]) {
    super(options, agendas);
    this.url = options.url;
  }


}
