# TDLib constants

This repository contains [TDLib](https://core.telegram.org/tdlib) \(1.4.0\) types directory.

## Installation

```bash
# npm
npm install @airgram/constants
```

## Basic usage

```typescript
import { UPDATE } from '@airgram/constants'

function handleUpdate (update) {
    switch (update._) {
      case UPDATE.updateAuthorizationState: 
        // ...
        break

      case UPDATE.updateNewMessage: 
        // ...
        break
      case UPDATE.updateNewChat: 
        // ...
        break
    }
}
```

Using in `airgram` middleware:

```typescript
import { UPDATE } from '@airgram/constants'
import { Airgram } from 'airgram'

const airgram = new Airgram({
  // config
})

airgram.on(UPDATE.updateUser, async ({ update }) => {
  console.log('[new user]:', update)
})
```

## License

The source code is licensed under GPL v3. License is available [here](https://github.com/esindger/airgram/tree/af4613c0534a5bd4f66a1460cadcc91e407e4c7e/LICENSE/README.md).

