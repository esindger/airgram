import { JsonValueUnion } from '@airgram/core/types'

/** Represents a JSON array */
export class JsonValueArrayBaseModel {
  public _: 'jsonValueArray'

  /** The list of array elements */
  public values: JsonValueUnion[]
}
