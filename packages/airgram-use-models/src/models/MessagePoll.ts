import { Poll } from '@airgram/core/types'

/** A message with a poll */
export class MessagePollBaseModel {
  public _: 'messagePoll'

  /** Poll */
  public poll: Poll
}
