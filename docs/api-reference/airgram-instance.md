# Airgram instance

This page describes public API of an `Airgram` instance:

| Key | Type | Note |
| :--- | :--- | :--- |
| `api` | Object | Contains wrappers for all [TDLib methods](methods.md). |
| `config` | Object | Airgram configuration. Readonly. |
| `catch` | `(handler) => void` | Overrides default error handler. Argument `handler` takes a function: `(error: Error, ctx?: Record<string, any>) => void` |
| `provider.pause` | `() => void` | Stop getting responses and updates from TDLib. Not available in web version. |
| `provider.resume` | `() => void` | Continue getting responses and updates from TDLib. Not available in web version. |
| `provider.destroy` | `() => void` | Destroy `Airgram` and TDLib instances. Not available in web version. |

