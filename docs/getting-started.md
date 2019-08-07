# Getting started

Please check out an [example](https://github.com/airgram/airgram-ts-example).

Basic usage:

```typescript
import { Airgram, Auth, prompt, toObject } from 'airgram'

const airgram = new Airgram({
  apiId: process.env.APP_ID as number | undefined,
  apiHash: process.env.APP_HASH,
  command: process.env.TDLIB_COMMAND,
  logVerbosityLevel: 2
})

const auth = new Auth(airgram)

auth.use({
  code: () => prompt(`Please enter the secret code:\n`),
  phoneNumber: () => prompt(`Please enter your phone number:\n`)
})

auth.ready(async () => {
  console.log('User has been signed in!')
})

void (async () => {
  const me = toObject(await airgram.api.getMe())
  console.log(`[Me] `, me)
})

// Getting all updates
airgram.use((ctx, next) => {
  if ('update' in ctx) {
    console.log(`[all updates][${ctx._}]`, JSON.stringify(ctx.update))
  }
  return next()
})

// Getting new messages
airgram.on('updateNewMessage', async ({ update }) => {
  const { message } = update
  console.log('[new message]', message)
})
```

