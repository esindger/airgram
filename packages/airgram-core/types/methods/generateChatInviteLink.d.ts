import { ApiRequestOptions, ApiResponse } from '../airgram'
import { ChatInviteLinkUnion } from '../outputs'

export interface GenerateChatInviteLinkParams {
  chatId?: number; // Chat identifier
}

/**
 * Generates a new invite link for a chat; the previously generated link is revoked.
 * Available for basic groups, supergroups, and channels. In basic groups this can be
 * called only by the group's creator; in supergroups and channels this requires appropriate
 * administrator rights
 * @param {Object} params
 * @param {number} [params.chatId] - Chat identifier
 * @param {ApiRequestOptions} options
 * @returns {Promise<ApiResponse<GenerateChatInviteLinkParams, ChatInviteLinkUnion>>}
 */
export type generateChatInviteLink<ExtensionT> = (
  params?: GenerateChatInviteLinkParams,
  options?: ApiRequestOptions
) => Promise<ApiResponse<GenerateChatInviteLinkParams, ChatInviteLinkUnion> & ExtensionT>
