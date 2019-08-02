import { ApiRequest, Data, PlainObjectToModelTransformer, TdProvider } from '@airgram/core'
import { TdJsonClient, TdJsonClientConfig } from './TdJsonClient'

export type TdJsonProviderConfig = Omit<TdJsonClientConfig, 'handleUpdate' | 'handleError' | 'models'>

export class TdJsonProvider extends TdProvider<TdJsonClient> {
  private readonly config: TdJsonProviderConfig

  public constructor (config: TdJsonProviderConfig = {}) {
    super()
    this.config = config
  }

  // noinspection JSUnusedGlobalSymbols
  public destroy (): void {
    if (this.client) {
      this.client.destroy()
    }
  }

  public initialize (
    handleUpdate: (update: Data) => Promise<unknown>,
    handleError: (error: Error | string) => void,
    models?: PlainObjectToModelTransformer
  ): void {
    this.client = new TdJsonClient({ ...this.config, handleUpdate, handleError, models })
  }

  // noinspection JSUnusedGlobalSymbols
  public pause (): void {
    if (this.client) {
      this.client.pause()
    }
  }

  // noinspection JSUnusedGlobalSymbols
  public resume (): void {
    if (this.client) {
      this.client.resume()
    }
  }

  public send (request: ApiRequest): Promise<Data> {
    if (!this.client) {
      throw new Error('TdJsonClient is not initialized.')
    }
    return this.client.send(request)
  }
}
