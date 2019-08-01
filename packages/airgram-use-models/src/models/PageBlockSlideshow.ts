import { PageBlockCaption, PageBlockUnion } from '@airgram/core/types'

/** A slideshow */
export class PageBlockSlideshowBaseModel {
  public _: 'pageBlockSlideshow'

  /** Slideshow item contents */
  public pageBlocks: PageBlockUnion[]

  /** Block caption */
  public caption: PageBlockCaption
}
