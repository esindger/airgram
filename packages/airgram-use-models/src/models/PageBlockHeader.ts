import { RichTextUnion } from '@airgram/core/types'

/** A header */
export class PageBlockHeaderBaseModel {
  public _: 'pageBlockHeader'

  /** Header */
  public header: RichTextUnion
}
