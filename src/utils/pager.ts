import { Subject } from 'rxjs';
import { IMessage } from '../types/IMessage';
const pager = new Subject<IMessage>();

export default pager;
