export type Message = PlayerMessage | Rolls | Private | GameMasterMessage

export class PlayerMessage {

  public readonly kind = 'player'

  public constructor (readonly actor: string, readonly events: PlayerEvent[]) {
  }

}

export class Rolls {

  public readonly kind = 'rolls'

  public constructor (readonly rolls: Roll[]) {
  }

}

export class Roll {

  public constructor (readonly roller: string, readonly result: number, readonly check: string) {
  }

}

export class Private {

  public readonly kind = 'private'

}

export class GameMasterMessage {

  public readonly kind = 'gm'

  public constructor (readonly events: Speech[]) {
  }

}

export type PlayerEvent = Action | Speech | PartialAction

export class Action {

  public readonly kind = 'action'

  public constructor (readonly message: string) {
  }

}

export class Speech {

  public readonly kind = 'speech'

  public constructor (readonly message: string) {
  }

}

export class PartialAction {

  public readonly kind = 'partial'

  public constructor (readonly action: string, readonly message: string) {
  }

}
