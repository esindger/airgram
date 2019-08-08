# Requests

All TDLib methods have wrappers, which accessible via the `api` property of Airgram instance. Each method implements the `ApiMethod` type:

```typescript
export interface TdError {
  _: 'error'
  code: number
  message: string
}

interface ApiRequest {
  method: string
  params?: Record<string, any>
}

interface ApiResponse {
  _: string
  request: ApiRequest
  response: Record<string, any> | TdError
  airgram: Airgram
  setState: Function
  getState: Function
}

type ApiMethod = (
  params?: Record<string, any>,
  options?: ApiRequestOptions
) => Promise<ApiResponse>

```

According to TDLib documentation any request may return error, so we have to handle it.

Let's look at the following example:

```typescript
interface Chats {
  _: 'chats'
  chatIds: number[]
}

void (async () => {
  // response is Chats | TdError
  const { response } = await airgram.api.getChats({
    limit: 10,
    offsetChatId: 0,
    offsetOrder: '9223372036854775807'
  })
  
  if(response._ === 'error') {
    // response is TdError
    console.error(response.message)
  }
  
  if(response._ !== 'error') {
    // response is Chats
    console.info(response.chatIds)
  }
}
```

This code looks a bit redundant because we use `if` operator twice. There are two type guard helpers to make code more readable.

### Type guard `isError`

This function checks whether response is error or not.

```typescript
import { isError } from 'airgram'

interface Ok {
  _: 'ok'
}

void (async () => {
  // response is Ok | TdError
  const { request, response } = await airgram.api.setProfilePhoto({
    photo: {
      _: 'inputFileLocal',
      path: '/invalid/path/to/image.jpg'
    }
  })
  
  if (isError(response)) {
    // response is TdError
    console.error(`[${request.method}][${response.code}] ${response.message}`)
  } else {
    // response is Ok
    console.log('Profile photo has been loaded.')
  }
}
```

### Type guard `toObject`

This function takes `ApiResponse` and returns response or throws an exception in case of an error.

```typescript
import { toObject } from 'airgram'

export interface User {
  _: 'user'
  id: number
  firstName: string
  [key: string]: any
}

void (async () => {
  try {
    // me is User
    const me = toObject(await airgram.api.getMe())
  } catch(error) {
    console.error(error.message)
  }
}
```

The same example in other style:

```typescript
import { toObject } from 'airgram'

airgram.api.getMe().then(toObject).then((me) => {
  console.log(`[Me] `, me)
}).catch((error) => {
  console.error(error.message)
})
```

### Request options

At the moment, it's supported only the [`state`](operation-state.md) option:

```typescript
interface ApiRequestOptions {
  state?: Record<string, unknown>
}
```

