export type Message = PlayerMessage | Rolls | Private | GameMasterMessage

export class PlayerMessage {

  readonly kind = "player"

  constructor(readonly actor: string, readonly events: PlayerEvent[]) {
  }

}

export class Rolls {

  readonly kind = "rolls"

  constructor(readonly rolls: Roll[]) {
  }

}

export class Roll {

  constructor(readonly roller: string, readonly result: number, readonly check: string) {
  }

}

export class Private {
  readonly kind = "private"
}

export class GameMasterMessage {
  readonly kind = "gm"

  constructor(readonly events: Speech[]) {
  }

}

export type PlayerEvent = Action | Speech | PartialAction

export class Action {

  readonly kind = "action"

  constructor(readonly message: string) {
  }

}

export class Speech {

  readonly kind = "speech"

  constructor(readonly message: string) {
  }

}

export class PartialAction {

  readonly kind = "partial"

  constructor(readonly action: string, readonly message: string) {
  }

}
