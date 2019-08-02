import { Airgram, Config } from '@airgram/core'
import { TdJsonProvider, TdJsonProviderConfig } from './components'

export interface AirgramConfig<ContextT>
  extends Omit<Config<ContextT>, 'provider'>, TdJsonProviderConfig {}

export class TdJsonAirgram<ContextT = {}> extends Airgram<ContextT, TdJsonProvider> {
  public constructor (config: AirgramConfig<ContextT>) {
    const { command, logFilePath, logMaxFileSize, logVerbosityLevel, ...restConfig } = config
    const baseConfig = {
      ...restConfig,
      provider: new TdJsonProvider({
        command,
        logFilePath,
        logMaxFileSize,
        logVerbosityLevel
      })
    }
    super(baseConfig)
  }
}
