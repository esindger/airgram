import { Audio, PageBlockCaption } from '@airgram/core/types'

/** An audio file */
export class PageBlockAudioBaseModel {
  public _: 'pageBlockAudio'

  /** Audio file; may be null */
  public audio?: Audio

  /** Audio file caption */
  public caption: PageBlockCaption
}
