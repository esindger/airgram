import { RichTextUnion } from '@airgram/core/types'

/** The footer of a page */
export class PageBlockFooterBaseModel {
  public _: 'pageBlockFooter'

  /** Footer */
  public footer: RichTextUnion
}
