import { ApiRequestOptions, ApiResponse } from '../airgram'
import { UsersUnion } from '../outputs'

/**
 * Returns all user contacts
 * @param {ApiRequestOptions} options
 * @returns {Promise<ApiResponse<undefined, UsersUnion>>}
 */
export type getContacts<ExtensionT> = (
  params?: never,
  options?: ApiRequestOptions
) => Promise<ApiResponse<never, UsersUnion> & ExtensionT>
