# Using models in Airgram

This small utility converts plain JSON objects to class instances.

## Install

```text
$ npm i @airgram/use-models
```

## Usage

For example, lets add some features to the [Chat](https://github.com/airgram/airgram-core/blob/master/docs/td-outputs.md#chat):

```typescript
import { Airgram } from 'airgram'
import { CHAT_TYPE, UPDATE } from '@airgram/constants'
import { ChatBaseModel, useModels } from '@airgram/use-models'

class ChatModel extends ChatBaseModel {
  get isBasicGroup (): boolean {
    return this.type._ === CHAT_TYPE.chatTypeBasicGroup
  }

  get isSupergroup (): boolean {
    return this.type._ === CHAT_TYPE.chatTypeSupergroup
  }

  get isPrivateChat (): boolean {
    return this.type._ === CHAT_TYPE.chatTypePrivate
  }

  get isSecretChat (): boolean {
    return this.type._ === CHAT_TYPE.chatTypeSecret
  }
}

// This is important for correct typings
declare module '@airgram/core/types/outputs/Chat' {
  export interface Chat extends ChatModel {}
}

const airgram = new Airgram({
  models: useModels({
    chat: ChatModel
  })
})

airgram.updates.on(UPDATE.updateNewChat, async ({ update }) => {
  const { chat } = update
  console.info('isBasicGroup: ', chat.isBasicGroup)
  console.info('isSupergroup: ', chat.isSupergroup)
  console.info('isPrivateChat: ', chat.isPrivateChat)
  console.info('isSecretChat: ', chat.isSecretChat)
})
```

## License

The source code is licensed under GPL v3. License is available [here](https://github.com/esindger/airgram/tree/af4613c0534a5bd4f66a1460cadcc91e407e4c7e/LICENSE/README.md).

