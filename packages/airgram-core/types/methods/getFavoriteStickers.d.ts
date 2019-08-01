import { ApiRequestOptions, ApiResponse } from '../airgram'
import { StickersUnion } from '../outputs'

/**
 * Returns favorite stickers
 * @param {ApiRequestOptions} options
 * @returns {Promise<ApiResponse<undefined, StickersUnion>>}
 */
export type getFavoriteStickers<ExtensionT> = (
  params?: never,
  options?: ApiRequestOptions
) => Promise<ApiResponse<never, StickersUnion> & ExtensionT>
