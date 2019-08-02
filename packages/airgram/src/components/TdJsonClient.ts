import { ApiRequest, Data, PlainObjectToModelTransformer } from '@airgram/core'
import { createDeserializer, createSerializer } from '../helpers'
import { TdJsonProxy } from './TdJsonProxy'

type NativeData = (Data & { '@extra'?: string }) | null

export interface ApiDeferred {
  _: string
  resolve: (result: Data) => unknown
  reject: (error: Error) => unknown
}

export interface TdJsonClientConfig {
  command?: string
  logFilePath?: string | null
  logMaxFileSize?: number | string
  logVerbosityLevel?: number
  handleUpdate: (update: Data) => Promise<unknown>
  handleError: (error: Error | string) => void
  models?: PlainObjectToModelTransformer
}

export class TdJsonClient {
  public timeout: number = 10

  private _tdlibClient?: Buffer

  private readonly deserialize: (key: string, value: unknown) => Record<string, unknown>

  private destroyed: boolean = false

  private readonly handleError: (error: Error | string) => void

  private readonly handleUpdate: (update: Data) => Promise<unknown>

  private readonly pending: Map<string, ApiDeferred> = new Map()

  private queryId: number = 0

  private readonly serialize: (key: string, value: unknown) => Record<string, unknown>

  private sleepPromise: Promise<void> | null = null

  private stack: NonNullable<NativeData>[] = []

  private readonly tdlib: TdJsonProxy

  private wakeup: (() => void) | null = null

  public constructor (config: TdJsonClientConfig) {
    this.handleUpdate = config.handleUpdate
    this.handleError = config.handleError
    this.serialize = createSerializer()
    this.deserialize = createDeserializer(config.models)
    this.tdlib = new TdJsonProxy({ command: config.command })

    if (config.logFilePath) {
      this.tdlib.setLogFilePath(config.logFilePath)
    }
    if (config.logMaxFileSize !== undefined) {
      this.tdlib.setLogMaxFileSize(config.logMaxFileSize)
    }
    if (config.logVerbosityLevel !== undefined) {
      this.tdlib.setLogVerbosityLevel(config.logVerbosityLevel)
    }
    this.tdlib.setLogFatalErrorCallback(this.handleError)

    this.loop().catch(() => {
      //
    })
  }

  public get tdlibClient (): Buffer {
    return this._tdlibClient || (this._tdlibClient = this.tdlib.create())
  }

  public destroy (): void {
    this.tdlib.destroy(this.tdlibClient)
    this.sleepPromise = null
    this.wakeup = null
    this.destroyed = true
  }

  public pause (): void {
    if (!this.wakeup) {
      this.sleepPromise = new Promise((resolve) => {
        this.wakeup = resolve
      })
    }
  }

  public resume (): void {
    if (this.wakeup) {
      this.wakeup()
      this.sleepPromise = null
      this.wakeup = null
    }
  }

  public send (request: ApiRequest): Promise<Data> {
    const id = `q${++this.queryId}`
    const { method, params } = request
    return new Promise<Data>((resolve, reject) => {
      this.pending.set(id, { _: method, resolve, reject })
      return this.tdlib.send(this.tdlibClient, JSON.stringify({
        ...params,
        '@extra': id,
        _: method
      }, this.serialize))
    })
  }

  protected async handleResponse (): Promise<void> {
    const response = this.stack.shift()

    if (!response) {
      return Promise.resolve()
    }

    const requestId = response['@extra']
    const deferred = requestId && this.pending.get(requestId)

    delete response['@extra']

    if (deferred && requestId) {
      this.pending.delete(requestId)
      deferred.resolve(response)
    } else {
      await this.handleUpdate(response)
    }

    setTimeout(() => this.handleResponse(), 0)
  }

  protected async receive (): Promise<NativeData | null> {
    try {
      const data: string | null = await this.tdlib.receive(this.tdlibClient, this.timeout)
      if (data === null) {
        return null
      }
      return JSON.parse(data, this.deserialize)
    } catch (e) {
      throw new Error(`[TdJsonClient] received invalid JSON`)
    }
  }

  private addToStack (response: NativeData): void {
    if (response && !this.destroyed) {
      this.stack.push(response)
      if (this.stack.length === 1) {
        this.handleResponse().catch(this.handleError)
      }
    }
  }

  private async loop (): Promise<void> {
    if (this.destroyed) {
      return
    }
    try {
      // console.info('start of loop')
      if (this.sleepPromise) {
        await this.sleepPromise
      }
      this.addToStack(await this.receive())
      // console.info('end of loop')
    } catch (error) {
      this.handleError(error)
    }
    setTimeout(() => this.loop(), 0)
  }
}
