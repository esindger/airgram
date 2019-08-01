import { TMeUrl } from '@airgram/core/types'

/** Contains a list of t.me URLs */
export class TMeUrlsBaseModel {
  public _: 'tMeUrls'

  /** List of URLs */
  public urls: TMeUrl[]
}
