import { AUTHORIZATION_STATE } from '@airgram/constants'
import { Composer } from '@airgram/core'
import {
  ApiResponse,
  AuthorizationStateUnion,
  AuthorizationStateWaitCode,
  BaseData,
  CheckAuthenticationCodeParams,
  CheckAuthenticationPasswordParams,
  ErrorUnion,
  Instance,
  MiddlewareFn,
  Ok,
  OkUnion,
  UpdateAuthorizationState
} from '@airgram/core/types'
import { TdJsonProvider } from './TdJsonProvider'

interface LoginDeferred {
  promise: Promise<void>;
  resolve: () => unknown;
  reject: (error: Error) => unknown;
}

type AuthAnswer = string | (() => string) | (() => Promise<string>)

interface AuthDialog {
  code?: AuthAnswer;
  firstName?: AuthAnswer;
  lastName?: AuthAnswer;
  phoneNumber?: AuthAnswer;
  password?: AuthAnswer;
  token?: AuthAnswer;
}

const AUTH_METHODS = [
  'checkAuthenticationBotToken',
  'checkAuthenticationCode',
  'checkAuthenticationPassword',
  'checkDatabaseEncryptionKey',
  'getAuthorizationState',
  'requestAuthenticationPasswordRecovery',
  'resendAuthenticationCode',
  'setAuthenticationPhoneNumber',
  'setTdlibParameters'
]

export class Auth {
  public maxAttempts: number = 3

  private airgram: Instance<unknown>

  private answers: Partial<Record<keyof AuthDialog, string>> = {}

  private attempt: number = 0

  private authState: AuthorizationStateUnion | ErrorUnion | null = null

  private deferred: LoginDeferred | null = null

  private dialog: AuthDialog = {}

  private invalidPhoneNumbers: Set<string> = new Set()

  public constructor (airgram: Instance<unknown>, dialog?: AuthDialog) {
    this.airgram = airgram
    airgram.use(this.middleware())
    if (dialog) {
      this.use(dialog)
    }
  }

  public get isAuthorized (): boolean {
    return !!(this.authState && this.authState._ === AUTHORIZATION_STATE.authorizationStateReady)
  }

  public get isBot (): boolean {
    return 'token' in this.dialog
  }

  public ready (): Promise<unknown>

  // eslint-disable-next-line no-dupe-class-members
  public ready (fn: () => unknown): unknown

  // eslint-disable-next-line no-dupe-class-members
  public ready (fn?: () => unknown): Promise<unknown> | unknown {
    if (fn) {
      return this.login().then(fn)
    }
    return this.login()
  }

  public use (dialog: AuthDialog): void {
    this.dialog = dialog
  }

  private async ask (type: keyof AuthDialog): Promise<string> {
    if (!(type in this.dialog) || !this.dialog[type]) {
      throw new Error(`The "${type}" option does not specified.`)
    }
    if (typeof this.dialog[type] === 'function') {
      return (this.dialog[type] as () => string)()
    }
    return this.dialog[type] as string
  }

  private async askPhoneNumber (): Promise<string> {
    return this.ask('phoneNumber')
      .then(async (phoneNumber) => {
        if (!phoneNumber) {
          throw new Error('Phone number is not defined')
        }
        if (this.invalidPhoneNumbers.has(phoneNumber) || !/^\+?\d{10,}$/.test(phoneNumber.trim())) {
          this.invalidPhoneNumbers.add(phoneNumber)
          delete this.answers.phoneNumber
          throw new Error('Invalid phone number')
        }
        return phoneNumber
      })
  }

  private async checkAuthenticationPassword (): Promise<ApiResponse<CheckAuthenticationPasswordParams, Ok>> {
    return this.airgram.api.checkAuthenticationPassword({
      password: await this.ask('password')
    })
  }

  private async fatalError (error: Error): Promise<false> {
    console.error(`[Airgram Auth] quit due an error: "${error.message}"`)
    if (this.airgram.provider instanceof TdJsonProvider) {
      await this.airgram.provider.destroy()
    }
    return false
  }

  private async handleError (error: ErrorUnion): Promise<boolean> {
    let promise: Promise<ApiResponse<unknown, Ok>> | null = null

    if (error.code === 429) {
      return this.fatalError(new Error(error.message))
    }

    switch (error.message) {
      case 'PHONE_NUMBER_INVALID': {
        if (this.answers.phoneNumber) {
          this.invalidPhoneNumbers.add(this.answers.phoneNumber)
          delete this.answers.phoneNumber
        }
        promise = this.askPhoneNumber()
          .then((phoneNumber) => this.airgram.api.setAuthenticationPhoneNumber({ phoneNumber }))
        break
      }
      case 'PHONE_CODE_EMPTY':
      case 'PHONE_CODE_EXPIRED':
      case 'PHONE_CODE_INVALID': {
        if (this.attempt < this.maxAttempts) {
          this.attempt += 1
          promise = this.sendCode(
            !!(this.authState && (this.authState as AuthorizationStateWaitCode).isRegistered))
        } else {
          return this.fatalError(new Error('Exceeded the limit of failed attempts'))
        }
        break
      }
      case 'PASSWORD_HASH_INVALID': {
        if (this.attempt < this.maxAttempts) {
          this.attempt += 1
          promise = this.checkAuthenticationPassword()
        } else {
          return this.fatalError(new Error('Exceeded the limit of failed attempts'))
        }
        break
      }
      default: {
        return false
      }
    }
    return promise
      ? promise.then((ctx) => {
        if (ctx.error) {
          this.handleError(ctx.error)
          return false
        }
        return true
      }).catch((error: Error) => this.fatalError(error))
      : true
  }

  private async handleUpdateState ({ authorizationState }: UpdateAuthorizationState): Promise<boolean> {
    this.attempt = 0
    this.authState = authorizationState
    let promise: Promise<ApiResponse<unknown, Ok>> | null = null

    switch (authorizationState._) {
      case 'authorizationStateWaitPhoneNumber': {
        if (this.isBot) {
          const token = await this.ask('token')
          promise = this.airgram.api.checkAuthenticationBotToken({ token })
        } else {
          promise = this.askPhoneNumber().then((phoneNumber) => this.airgram.api.setAuthenticationPhoneNumber({
            phoneNumber
          }))
        }
        break
      }
      case 'authorizationStateWaitCode': {
        promise = this.sendCode(authorizationState.isRegistered)
        break
      }
      case 'authorizationStateWaitPassword': {
        promise = this.checkAuthenticationPassword()
        break
      }
      case 'authorizationStateReady': {
        if (this.deferred) {
          await this.deferred.resolve()
          this.deferred = null
        }
        break
      }
      default: {
        return false
      }
    }

    return promise ? promise.then((ctx) => {
        if (ctx.error) {
          this.handleError(ctx.error)
          return false
        }
        return true
      }).catch((error: Error) => this.fatalError(error))
      : true
  }

  private async login (): Promise<void> {
    if (!this.deferred) {
      const deferred: Partial<LoginDeferred> = {}
      deferred.promise = new Promise<void>((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
      })
      this.deferred = deferred as LoginDeferred
      if (!this.authState) {
        const { response: authState } = await this.airgram.api.getAuthorizationState()
        this.authState = authState || null
      }
    }
    return this.deferred.promise
  }

  private middleware (): MiddlewareFn<unknown> {
    return Composer.compose([
      Composer.filter((ctx: | { update?: UpdateAuthorizationState }) => !('update' in ctx) ||
        !ctx.update ||
        ctx.update._ !== 'updateAuthorizationState' ||
        !this.handleUpdateState(ctx.update)
      ),
      Composer.optional(
        (ctx: BaseData) => !this.isAuthorized && !AUTH_METHODS.includes(ctx._),
        (_ctx, next) => this.login().then(next)
      )
    ])
  }

  private async sendCode (isRegistered: boolean): Promise<ApiResponse<CheckAuthenticationCodeParams, OkUnion>> {
    const code = await this.ask('code')
    if (!code || !/^\d+$/.test(code)) {
      throw new Error('Invalid authorization code')
    }
    return this.airgram.api.checkAuthenticationCode({
      code,
      firstName: (!isRegistered && await this.ask('firstName')) || undefined,
      lastName: (!isRegistered && await this.ask('lastName')) || undefined
    })
  }
}
