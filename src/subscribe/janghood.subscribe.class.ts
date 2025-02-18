/**
 * @description
 * @author 阿怪
 * @date 2025/1/21 21:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SubscribeAddress, SubscribeAddressType } from '../core/plugins/subscribe/composables/subscribeAddress.class.ts';
import MCalendarAgenda from '../core/model/month/components/MCalendarAgenda.vue';


type IssueAgent = {
  id: number;
  title: string;
  type: string;
  parentId: number;
  projectId: number;
}

type OrganizationVO = {
  id: number;
  name?: string;
  key: string;
  projects: {
    id: number;
    name: string;
    key: string;
  }[]
}


export class JanghoodSubscribe extends SubscribeAddress {

  name = 'janghood';

  constructor(
    options: SubscribeAddressType,
    agendas: MCalendarAgenda<IssueAgent>[],
  ) {
    super(options, agendas);
  }

  projectOrganizationMap = new Map<number, OrganizationVO>();
  organizationSubscribeMap = new Map<number, JanghoodOrganizationSubscribe>();

  setOrganization(organizationList: OrganizationVO[]) {
    organizationList.forEach((organization) => {

      const organizationSubscribe  = new JanghoodOrganizationSubscribe({
        name: organization.name,
        active: true,
      },[])

      organization.projects.forEach((project) => {
        this.projectOrganizationMap.set(project.id, organization);
      });
      organizationSubscribe.setProjects(organization.projects);
      this.organizationSubscribeMap.set(organization.id, organizationSubscribe);
    });
  }

  pushAgenda(agenda: MCalendarAgenda) {
    const projectId = agenda.info!.projectId;
    const organizationId = this.projectOrganizationMap.get(projectId)?.id;
    if(organizationId){
      this.organizationSubscribeMap.get(organizationId)?.pushAgenda(agenda);
    }
  }

  pushAgendas(agendas: MCalendarAgenda[]) {
    agendas.forEach(agenda => this.pushAgenda(agenda));
  }

  get children() {
    return Array.from(this.organizationSubscribeMap.values());
  }

}


class JanghoodOrganizationSubscribe extends SubscribeAddress {

  projectSubscribeMap = new Map<number, JanghoodProjectSubscribe>();

  setProjects(projects: OrganizationVO['projects']) {
    projects.forEach((project) => {
      this.projectSubscribeMap.set(project.id, new JanghoodProjectSubscribe({
        name: project.name,
        active: true,
      }, []));
    });
  }

  constructor(options: SubscribeAddressType, agendas: MCalendarAgenda<IssueAgent>[]) {
    super(options, agendas);
  }

  pushAgenda(agenda: MCalendarAgenda) {
    const projectId = agenda.info!.projectId;
    this.projectSubscribeMap.get(projectId)?.pushAgenda(agenda);
  }

  get children() {
    return Array.from(this.projectSubscribeMap.values());
  }

}

class JanghoodProjectSubscribe extends SubscribeAddress {

  typeMap = new Map<string, SubscribeAddress>();

  constructor(options: SubscribeAddressType, agendas: MCalendarAgenda<IssueAgent>[]) {
    super(options, agendas);
    this._agendas = [];
    // 根据type分类
    agendas.forEach(agenda => {
      if (!this.typeMap.has(agenda.info!.type)) {
        this.typeMap.set(agenda.info!.type, new SubscribeAddress({
          name: agenda.info!.type,
          active: true,
        }, []));
      }
      this.typeMap.get(agenda.info!.type)?.pushAgenda(agenda);
    });

    this.children = Array.from(this.typeMap.values());
  }

  pushAgenda(agenda: MCalendarAgenda) {
    if (!this.typeMap.has(agenda.info!.type)) {
      this.typeMap.set(agenda.info!.type, new SubscribeAddress({
        name: agenda.info!.type,
        active: true,
      }, []));
    }
    this.typeMap.get(agenda.info!.type)?.pushAgenda(agenda);
  }

  set children(children: SubscribeAddress[]) {
    this._children = children;
  }

  get children() {
    return Array.from(this.typeMap.values());
  }


}
