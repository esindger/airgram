import { ChatEvent } from '@airgram/core/types'

/** Contains a list of chat events */
export class ChatEventsBaseModel {
  public _: 'chatEvents'

  /** List of events */
  public events: ChatEvent[]
}
