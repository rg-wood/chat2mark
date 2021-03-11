"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialAction = exports.Speech = exports.Action = exports.GameMasterMessage = exports.Private = exports.Roll = exports.Rolls = exports.PlayerMessage = void 0;
class PlayerMessage {
    constructor(actor, events) {
        this.actor = actor;
        this.events = events;
        this.kind = 'player';
    }
}
exports.PlayerMessage = PlayerMessage;
class Rolls {
    constructor(rolls) {
        this.rolls = rolls;
        this.kind = 'rolls';
    }
}
exports.Rolls = Rolls;
class Roll {
    constructor(actor, result, check) {
        this.actor = actor;
        this.result = result;
        this.check = check;
        this.kind = 'roll';
    }
}
exports.Roll = Roll;
class Private {
    constructor() {
        this.kind = 'private';
    }
}
exports.Private = Private;
class GameMasterMessage {
    constructor(events) {
        this.events = events;
        this.kind = 'gm';
    }
}
exports.GameMasterMessage = GameMasterMessage;
class Action {
    constructor(message) {
        this.message = message;
        this.kind = 'action';
    }
}
exports.Action = Action;
class Speech {
    constructor(message) {
        this.message = message;
        this.kind = 'speech';
    }
}
exports.Speech = Speech;
class PartialAction {
    constructor(action, message) {
        this.action = action;
        this.message = message;
        this.kind = 'partial';
    }
}
exports.PartialAction = PartialAction;
