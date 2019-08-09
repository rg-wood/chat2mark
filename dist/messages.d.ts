export declare type Message = PlayerMessage | Roll | Private | GameMasterMessage;
export declare class PlayerMessage {
    readonly actor: string;
    readonly events: PlayerEvent[];
    readonly kind = "player";
    constructor(actor: string, events: PlayerEvent[]);
}
export declare class Roll {
    readonly roller: string;
    readonly result: number;
    readonly check: string;
    readonly kind = "roll";
    constructor(roller: string, result: number, check: string);
}
export declare class Private {
    readonly kind = "private";
}
export declare class GameMasterMessage {
    readonly events: Speech[];
    readonly kind = "gm";
    constructor(events: Speech[]);
}
export declare type PlayerEvent = Action | Speech | PartialAction;
export declare class Action {
    readonly message: string;
    readonly kind = "action";
    constructor(message: string);
}
export declare class Speech {
    readonly message: string;
    readonly kind = "speech";
    constructor(message: string);
}
export declare class PartialAction {
    readonly action: string;
    readonly message: string;
    readonly kind = "partial";
    constructor(action: string, message: string);
}
