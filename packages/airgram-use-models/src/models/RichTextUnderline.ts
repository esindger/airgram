import { RichTextUnion } from '@airgram/core/types'

/** An underlined rich text */
export class RichTextUnderlineBaseModel {
  public _: 'richTextUnderline'

  /** Text */
  public text: RichTextUnion
}
