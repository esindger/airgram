import { RichTextUnion } from '@airgram/core/types'

/** A text paragraph */
export class PageBlockParagraphBaseModel {
  public _: 'pageBlockParagraph'

  /** Paragraph text */
  public text: RichTextUnion
}
