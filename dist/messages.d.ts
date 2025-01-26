export declare class Message {
    readonly actor: string;
    readonly type: PlayerEvent;
    readonly message: string;
    constructor(actor: string, type: PlayerEvent, message: string);
}
export declare type PlayerEvent = 'does' | 'says' | 'rolls';
