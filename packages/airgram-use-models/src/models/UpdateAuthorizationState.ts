import { AuthorizationStateUnion } from '@airgram/core/types'

/** The user authorization state has changed */
export class UpdateAuthorizationStateBaseModel {
  public _: 'updateAuthorizationState'

  /** New authorization state */
  public authorizationState: AuthorizationStateUnion
}
