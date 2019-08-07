# Introduction

TDLib library allows developers to use all the features of Telegram. However, its API is quite complex and continues to change from version to version. JavaScript is not strongly typed, so it's easy to make a mistake.

Airgram is a library that aims at making process of creating telegram client enjoyable. There are some key features:

* Strongly typed;
* Documentated TDLib API \(JSDoc\);
* Flexible \(custom models, custom context, middleware, etc\).

All TDLib classes and methods have suitable wrappers with straightforward API. There are only two differences:

* All parameter names are represent in "camelCase".
* Parameter `@type` renamed to `_`.



