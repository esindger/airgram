import { UserStatusUnion } from '@airgram/core/types'

/** The user went online or offline */
export class UpdateUserStatusBaseModel {
  public _: 'updateUserStatus'

  /** User identifier */
  public userId: number

  /** New status of the user */
  public status: UserStatusUnion
}
