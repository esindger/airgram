import { ApiRequestOptions, ApiResponse } from '../airgram'
import { OkUnion } from '../outputs'

export interface SetSupergroupStickerSetParams {
  supergroupId?: number; // Identifier of the supergroup
  stickerSetId?: string; // New value of the supergroup sticker set identifier. Use 0 to remove the supergroup sticker set
}

/**
 * Changes the sticker set of a supergroup; requires appropriate rights in the supergroup
 * @param {Object} params
 * @param {number} [params.supergroupId] - Identifier of the supergroup
 * @param {string} [params.stickerSetId] - New value of the supergroup sticker set
 * identifier. Use 0 to remove the supergroup sticker set
 * @param {ApiRequestOptions} options
 * @returns {Promise<ApiResponse<SetSupergroupStickerSetParams, OkUnion>>}
 */
export type setSupergroupStickerSet<ExtensionT> = (
  params?: SetSupergroupStickerSetParams,
  options?: ApiRequestOptions
) => Promise<ApiResponse<SetSupergroupStickerSetParams, OkUnion> & ExtensionT>
