# Configuration

This page describes the options you can pass to `Airgram` constructor:

```text
import { Airgram } from 'airgram'

const airgram = new Airgram({
  // options
})
```

### TDLib options

| Key | Type | Note |
| :--- | :--- | :--- |
| `command` | `string` | Path to the `tdjson` \(windows\) / `libtdjson` \(unix\) command. |
| `logFilePath` | `string` | Path to a file where the internal TDLib log will be written. Use an empty path to switch back to the default logging behaviour. Not available in web version. |
| `logMaxFileSize` | `number` | Maximum size of the file to where the internal TDLib log is written before the file will be auto-rotated. Should be positive. Not available in web version. |
| `logVerbosityLevel` | `number` | New value of the verbosity level for logging. Value 0 corresponds to fatal errors, value 1 corresponds to errors, value 2 corresponds to warnings and debug warnings, value 3 corresponds to informational, value 4 corresponds to debug, value 5 corresponds to verbose debug, value greater than 5 and up to 1024 can be used to enable even more logging. |
| `useTestDc` | `boolean` | If set to true, the Telegram test environment will be used instead of the production environment |
| `databaseDirectory` | `string` | The path to the directory for the persistent database |
| `filesDirectory` | `string` | The path to the directory for storing files |
| `useFileDatabase` | `boolean` | If set to true, information about downloaded and uploaded files will be saved between application restarts |
| `useChatInfoDatabase` | `boolean` | If set to true, the library will maintain a cache of users, basic groups, supergroups, channels and secret chats. Implies `useFileDatabase` |
| `useMessageDatabase` | `boolean` | If set to true, the library will maintain a cache of chats and messages. Implies `useChatInfoDatabase` |
| `useSecretChats` | `boolean` | If set to true, support for secret chats will be enabled |
| `apiId` | `number` | Application identifier for Telegram API access, which can be obtained at [https://my.telegram.org](https://my.telegram.org) |
| `apiHash` | `string` | Application identifier hash for Telegram API access, which can be obtained at [https://my.telegram.org](https://my.telegram.org) |
| `systemLanguageCode` | `string` | IETF language tag of the user's operating system language |
| `deviceModel` | `string` | Model of the device the application is being run on |
| `systemVersion` | `string` | Version of the operating system the application is being run on |
| `applicationVersion` | `string` | Application version |
| `enableStorageOptimizer` | `boolean` | If set to true, old files will automatically be deleted |
| `ignoreFileNames` | `boolean` | If set to true, original file names will be ignored. Otherwise, downloaded files will be saved under names as close as possible to the original name |
| `databaseEncryptionKey` | `string` | Encryption key |

### Other options

| Key | Type | Note |
| :--- | :--- | :--- |
| `models` | `Function` | Contains function, which converts plain JSON objects to models. [Details](advanced-topics/use-models.md). |
| `context` | `Function`\|`Object` | Object or function that returns an object with custom context. [Details](advanced-topics/extend-context.md). |

