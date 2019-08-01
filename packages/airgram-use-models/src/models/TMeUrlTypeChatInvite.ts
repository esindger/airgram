import { ChatInviteLinkInfo } from '@airgram/core/types'

/** A chat invite link */
export class TMeUrlTypeChatInviteBaseModel {
  public _: 'tMeUrlTypeChatInvite'

  /** Chat invite link info */
  public info: ChatInviteLinkInfo
}
