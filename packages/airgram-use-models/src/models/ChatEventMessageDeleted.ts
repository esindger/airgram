import { Message } from '@airgram/core/types'

/** A message was deleted */
export class ChatEventMessageDeletedBaseModel {
  public _: 'chatEventMessageDeleted'

  /** Deleted message */
  public message: Message
}
