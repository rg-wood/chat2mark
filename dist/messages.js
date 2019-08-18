"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerMessage {
    constructor(actor, events) {
        this.actor = actor;
        this.events = events;
        this.kind = "player";
    }
}
exports.PlayerMessage = PlayerMessage;
class Rolls {
    constructor(rolls) {
        this.rolls = rolls;
        this.kind = "rolls";
    }
}
exports.Rolls = Rolls;
class Roll {
    constructor(roller, result, check) {
        this.roller = roller;
        this.result = result;
        this.check = check;
    }
}
exports.Roll = Roll;
class Private {
    constructor() {
        this.kind = "private";
    }
}
exports.Private = Private;
class GameMasterMessage {
    constructor(events) {
        this.events = events;
        this.kind = "gm";
    }
}
exports.GameMasterMessage = GameMasterMessage;
class Action {
    constructor(message) {
        this.message = message;
        this.kind = "action";
    }
}
exports.Action = Action;
class Speech {
    constructor(message) {
        this.message = message;
        this.kind = "speech";
    }
}
exports.Speech = Speech;
class PartialAction {
    constructor(action, message) {
        this.action = action;
        this.message = message;
        this.kind = "partial";
    }
}
exports.PartialAction = PartialAction;
