import { Message } from './messages';
export declare const toCsv: (messages: Message[]) => string;
export declare function fromOocCsv(csv: string): Message[];
