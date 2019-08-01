import { RichTextUnion } from '@airgram/core/types'

/** A subscript rich text */
export class RichTextSubscriptBaseModel {
  public _: 'richTextSubscript'

  /** Text */
  public text: RichTextUnion
}
