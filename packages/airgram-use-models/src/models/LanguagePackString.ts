import { LanguagePackStringValueUnion } from '@airgram/core/types'

/** Represents one language pack string */
export class LanguagePackStringBaseModel {
  public _: 'languagePackString'

  /** String key */
  public key: string

  /** String value */
  public value: LanguagePackStringValueUnion
}
