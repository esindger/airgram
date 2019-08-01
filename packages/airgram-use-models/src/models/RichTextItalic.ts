import { RichTextUnion } from '@airgram/core/types'

/** An italicized rich text */
export class RichTextItalicBaseModel {
  public _: 'richTextItalic'

  /** Text */
  public text: RichTextUnion
}
