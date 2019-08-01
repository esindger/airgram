import { InlineKeyboardButton } from '@airgram/core/types'

/** Contains an inline keyboard layout */
export class ReplyMarkupInlineKeyboardBaseModel {
  public _: 'replyMarkupInlineKeyboard'

  /** A list of rows of inline keyboard buttons */
  public rows: InlineKeyboardButton[][]
}
