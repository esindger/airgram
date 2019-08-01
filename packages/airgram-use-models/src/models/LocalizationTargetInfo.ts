import { LanguagePackInfo } from '@airgram/core/types'

/** Contains information about the current localization target */
export class LocalizationTargetInfoBaseModel {
  public _: 'localizationTargetInfo'

  /** List of available language packs for this application */
  public languagePacks: LanguagePackInfo[]
}
