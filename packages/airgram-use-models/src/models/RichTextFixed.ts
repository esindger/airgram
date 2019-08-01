import { RichTextUnion } from '@airgram/core/types'

/** A fixed-width rich text */
export class RichTextFixedBaseModel {
  public _: 'richTextFixed'

  /** Text */
  public text: RichTextUnion
}
