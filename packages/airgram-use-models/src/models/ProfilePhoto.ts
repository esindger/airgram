import { File } from '@airgram/core'

/** Describes a user profile photo */
export class ProfilePhotoBaseModel {
  public _: 'profilePhoto'

  /**
   * Photo identifier; 0 for an empty photo. Can be used to find a photo in a list of
   * userProfilePhotos
   */
  public id: string

  /** A small (160x160) user profile photo */
  public small: File

  /** A big (640x640) user profile photo */
  public big: File
}
