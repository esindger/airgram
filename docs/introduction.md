# Introduction

Since the release of [Telegram Database library](https://github.com/tdlib/td), developers have got a way to use Telegram in their applications.

However, its API is quite vast and continues to change from version to version. That's why it's easy to make a mistake or miss some breaking changes. Airgram comes to developer's rescue.

Airgram is a library that aims at making usage TDLib enjoyable. There are some key points:

* Strongly typed;
* Documentated TDLib API \(JSDoc\);
* Flexible \(custom models, custom context, middleware, etc\).

All TDLib classes and methods have suitable wrappers with straightforward API. There are only two differences:

* All parameter names are represent in "camelCase".
* Parameter `@type` renamed to `_`.



