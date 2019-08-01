import { PersonalDocument } from '@airgram/core/types'

/** A Telegram Passport element containing the user's bank statement */
export class PassportElementBankStatementBaseModel {
  public _: 'passportElementBankStatement'

  /** Bank statement */
  public bankStatement: PersonalDocument
}
