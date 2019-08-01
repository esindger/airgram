import { Wallpaper } from '@airgram/core/types'

/** Contains a list of wallpapers */
export class WallpapersBaseModel {
  public _: 'wallpapers'

  /** A list of wallpapers */
  public wallpapers: Wallpaper[]
}
