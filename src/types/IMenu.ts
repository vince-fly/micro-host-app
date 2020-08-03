// import { IMenu } from '@/store/modules/menu';

export interface IMenuMeta {
  title?: string;
  icon: string;
  roles: string[];
  noCache?: boolean;
}

export interface ITopMenu {
  path: string;
  component: string | any;
  children?: IMenuItem[];
  redirect?: string;
  meta?: IMenuMeta;
}

export interface IMenuItem extends ITopMenu {
  name?: string;
}

export interface IRawMenu {
  subMenus: IRawMenu[];
  smu_id: number;
  smu_parentid: number;
  smu_path: string | null;
  smu_params: string | null;
  smu_name_cn: string | null;
  smu_name_en: string | null;
  smu_desc_cn: string | null;
  smu_desc_en: string | null;
  smu_sequence: number;
  smu_status: string | null;
  smu_hasseparator: string | null;
  smu_ismultiform: string | null;
  smu_disabledisplay: string | null;

}
