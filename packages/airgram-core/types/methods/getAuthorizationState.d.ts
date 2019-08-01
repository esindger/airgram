import { ApiRequestOptions, ApiResponse } from '../airgram'
import { AuthorizationStateUnion } from '../outputs'

/**
 * Returns the current authorization state; this is an offline request. For informational
 * purposes only. Use updateAuthorizationState instead to maintain the current authorization
 * state
 * @param {ApiRequestOptions} options
 * @returns {Promise<ApiResponse<undefined, AuthorizationStateUnion>>}
 */
export type getAuthorizationState<ExtensionT> = (
  params?: never,
  options?: ApiRequestOptions
) => Promise<ApiResponse<never, AuthorizationStateUnion> & ExtensionT>
