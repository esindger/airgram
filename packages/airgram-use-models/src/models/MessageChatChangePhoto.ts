import { Photo } from '@airgram/core/types'

/** An updated chat photo */
export class MessageChatChangePhotoBaseModel {
  public _: 'messageChatChangePhoto'

  /** New chat photo */
  public photo: Photo
}
