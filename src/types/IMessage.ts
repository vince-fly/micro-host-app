import { IToken } from './IToken';

export interface IRouteData {
  href: string;
  title?: string;
  state?: any;
}
export interface IRouteMessage {
  type: 'route';
  cmd: 'redirect' | 'replace';
  message: IRouteData;
}

export interface IAuthMessage {
  type: 'auth';
  cmd: 'sign' | 'refetch' | 'logout';
  message: IToken;
}

export interface ICommonMessage {
  type: 'common';
  cmd?: any;
  message?: any;
}

export interface IMessage {
  from?: string;
  data: IRouteMessage | IAuthMessage | ICommonMessage;
  time?: Date;
}
