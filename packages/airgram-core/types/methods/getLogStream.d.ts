import { ApiRequestOptions, ApiResponse } from '../airgram'
import { LogStreamUnion } from '../outputs'

/**
 * Returns information about currently used log stream for internal logging of TDLib.
 * This is an offline method. Can be called before authorization. Can be called synchronously
 * @param {ApiRequestOptions} options
 * @returns {Promise<ApiResponse<undefined, LogStreamUnion>>}
 */
export type getLogStream<ExtensionT> = (
  params?: never,
  options?: ApiRequestOptions
) => Promise<ApiResponse<never, LogStreamUnion> & ExtensionT>
