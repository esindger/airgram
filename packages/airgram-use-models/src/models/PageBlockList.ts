import { PageBlockListItem } from '@airgram/core/types'

/** A list of data blocks */
export class PageBlockListBaseModel {
  public _: 'pageBlockList'

  /** The items of the list */
  public items: PageBlockListItem[]
}
