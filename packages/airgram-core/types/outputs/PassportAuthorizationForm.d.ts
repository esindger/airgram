import { PassportRequiredElement } from './'

export type PassportAuthorizationFormUnion = PassportAuthorizationForm

/** Contains information about a Telegram Passport authorization form that was requested */
export interface PassportAuthorizationForm {
  _: 'passportAuthorizationForm';
  /** Unique identifier of the authorization form */
  id: number;
  /**
   * Information about the Telegram Passport elements that need to be provided to complete
   * the form
   */
  requiredElements: PassportRequiredElement[];
  /** URL for the privacy policy of the service; may be empty */
  privacyPolicyUrl: string;
}
