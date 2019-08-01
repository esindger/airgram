export enum AUTHORIZATION_STATE {
  authorizationStateWaitTdlibParameters = 'authorizationStateWaitTdlibParameters',
  authorizationStateWaitEncryptionKey = 'authorizationStateWaitEncryptionKey',
  authorizationStateWaitPhoneNumber = 'authorizationStateWaitPhoneNumber',
  authorizationStateWaitCode = 'authorizationStateWaitCode',
  authorizationStateWaitPassword = 'authorizationStateWaitPassword',
  authorizationStateReady = 'authorizationStateReady',
  authorizationStateLoggingOut = 'authorizationStateLoggingOut',
  authorizationStateClosing = 'authorizationStateClosing',
  authorizationStateClosed = 'authorizationStateClosed'
}
