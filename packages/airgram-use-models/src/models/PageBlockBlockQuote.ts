import { RichTextUnion } from '@airgram/core/types'

/** A block quote */
export class PageBlockBlockQuoteBaseModel {
  public _: 'pageBlockBlockQuote'

  /** Quote text */
  public text: RichTextUnion

  /** Quote credit */
  public credit: RichTextUnion
}
