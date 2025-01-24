export declare type Message = ActorMessage | Private | GameMasterMessage;
export declare class ActorMessage {
    readonly actor: string;
    readonly event: PlayerEvent;
    readonly kind = "actor";
    constructor(actor: string, event: PlayerEvent);
}
export declare class Private {
    readonly kind = "private";
}
export declare class GameMasterMessage {
    readonly message: string;
    readonly kind = "gm";
    constructor(message: string);
}
export declare type PlayerEvent = Action | Speech;
export declare class Action {
    readonly message: string;
    readonly kind = "does";
    constructor(message: string);
}
export declare class Speech {
    readonly message: string;
    readonly kind = "says";
    constructor(message: string);
}
export declare class Roll {
    readonly message: string;
    readonly kind = "rolls";
    constructor(message: string);
}
