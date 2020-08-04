export interface ISidebar {
  opened?: boolean;
  withoutAnimation: boolean;
}

export interface IAppState {
  sidebar: ISidebar;

  device: string;
  size: string;
}
