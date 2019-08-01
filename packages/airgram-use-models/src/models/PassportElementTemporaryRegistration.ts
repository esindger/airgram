import { PersonalDocument } from '@airgram/core/types'

/** A Telegram Passport element containing the user's temporary registration */
export class PassportElementTemporaryRegistrationBaseModel {
  public _: 'passportElementTemporaryRegistration'

  /** Temporary registration */
  public temporaryRegistration: PersonalDocument
}
