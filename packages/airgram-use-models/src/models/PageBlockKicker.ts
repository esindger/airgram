import { RichTextUnion } from '@airgram/core/types'

/** A kicker */
export class PageBlockKickerBaseModel {
  public _: 'pageBlockKicker'

  /** Kicker */
  public kicker: RichTextUnion
}
