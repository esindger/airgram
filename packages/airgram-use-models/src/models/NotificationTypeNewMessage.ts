import { Message } from '@airgram/core/types'

/** New message was received */
export class NotificationTypeNewMessageBaseModel {
  public _: 'notificationTypeNewMessage'

  /** The message */
  public message: Message
}
