export class Message {

  public constructor (
    readonly actor: string,
    readonly type: PlayerEvent,
    readonly chat: ChatType,
    readonly message: string,
    readonly timestamp: Date | undefined
  ) {}

}

export type PlayerEvent = 'does' | 'says' | 'rolls'

export type ChatType = 'ic' | 'ooc'

export type MessageFilter = (message: Message[]) => Message[]
