import { Message } from '@airgram/core/types'

/** A new message was received; can also be an outgoing message */
export class UpdateNewMessageBaseModel {
  public _: 'updateNewMessage'

  /** The new message */
  public message: Message
}
