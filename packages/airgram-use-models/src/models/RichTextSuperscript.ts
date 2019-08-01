import { RichTextUnion } from '@airgram/core/types'

/** A superscript rich text */
export class RichTextSuperscriptBaseModel {
  public _: 'richTextSuperscript'

  /** Text */
  public text: RichTextUnion
}
