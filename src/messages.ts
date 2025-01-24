export class Message {
  public constructor (
    readonly actor: string,
    readonly type: PlayerEvent,
    readonly message: string
  ) {
  }
}

export type PlayerEvent = 'does' | 'says' | 'rolls'
