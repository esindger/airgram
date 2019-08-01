import { PersonalDocument } from '@airgram/core/types'

/** A Telegram Passport element containing the user's passport registration pages */
export class PassportElementPassportRegistrationBaseModel {
  public _: 'passportElementPassportRegistration'

  /** Passport registration pages */
  public passportRegistration: PersonalDocument
}
