export class Message {

  public constructor (
    readonly actor: string,
    readonly type: PlayerEvent,
    readonly message: string,
    readonly timestamp: Date | undefined
  ) {}

}

export type PlayerEvent = 'does' | 'says' | 'rolls'

export type MessageFilter = (message: Message[]) => Message[]
