import { PageBlockUnion } from '@airgram/core/types'

/** A page cover */
export class PageBlockCoverBaseModel {
  public _: 'pageBlockCover'

  /** Cover */
  public cover: PageBlockUnion
}
