import { Venue } from '@airgram/core/types'

/** A message with information about a venue */
export class MessageVenueBaseModel {
  public _: 'messageVenue'

  /** Message content */
  public venue: Venue
}
