import { TestInt } from '@airgram/core/types'

/** A simple object containing a vector of objects that hold a number; for testing only */
export class TestVectorIntObjectBaseModel {
  public _: 'testVectorIntObject'

  /** Vector of objects */
  public value: TestInt[]
}
