import { Message } from '@airgram/core/types'

/** A message was pinned */
export class ChatEventMessagePinnedBaseModel {
  public _: 'chatEventMessagePinned'

  /** Pinned message */
  public message: Message
}
