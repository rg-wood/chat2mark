import { Message } from './messages';
export declare const toCsv: (messages: Message[]) => string;
export declare const parseCsv: (csv: string) => Message[];
