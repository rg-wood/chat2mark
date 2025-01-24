"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roll = exports.Speech = exports.Action = exports.GameMasterMessage = exports.Private = exports.ActorMessage = void 0;
class ActorMessage {
    constructor(actor, event) {
        this.actor = actor;
        this.event = event;
        this.kind = 'actor';
    }
}
exports.ActorMessage = ActorMessage;
class Private {
    constructor() {
        this.kind = 'private';
    }
}
exports.Private = Private;
class GameMasterMessage {
    constructor(message) {
        this.message = message;
        this.kind = 'gm';
    }
}
exports.GameMasterMessage = GameMasterMessage;
class Action {
    constructor(message) {
        this.message = message;
        this.kind = 'does';
    }
}
exports.Action = Action;
class Speech {
    constructor(message) {
        this.message = message;
        this.kind = 'says';
    }
}
exports.Speech = Speech;
class Roll {
    constructor(message) {
        this.message = message;
        this.kind = 'rolls';
    }
}
exports.Roll = Roll;
