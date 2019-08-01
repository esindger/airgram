import { PassportElementUnion } from '@airgram/core/types'

/** Contains information about saved Telegram Passport elements */
export class PassportElementsBaseModel {
  public _: 'passportElements'

  /** Telegram Passport elements */
  public elements: PassportElementUnion[]
}
