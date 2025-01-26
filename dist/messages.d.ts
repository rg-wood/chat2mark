export declare class Message {
    readonly actor: string;
    readonly type: PlayerEvent;
    readonly message: string;
    readonly timestamp: Date | undefined;
    constructor(actor: string, type: PlayerEvent, message: string, timestamp: Date | undefined);
}
export declare type PlayerEvent = 'does' | 'says' | 'rolls';
export declare type MessageFilter = (message: Message[]) => Message[];
