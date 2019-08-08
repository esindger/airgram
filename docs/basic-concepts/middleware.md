# Middleware

Middleware is a chain of callback functions, which are called before a request is send to TDLib or when updates coming from TDLib. Middleware allows you modify requests, responses and handle updates.

This is a scaffolding for middleware function:

```typescript
airgram.use((ctx, next) => {
  
  // This code will be invoked before every request and after all updates.
  
  return next()
})

// You may specify types of events you want to handle
airgram.on('updateNewChat', (ctx, next) => {
  console.log(`Update ${ctx._}: ${JSON.stringify(ctx.update)}`)
  return next()
})
```

You can use any method name or update type as an event. For example: `getChat` or `updateUser`.

Middleware callback takes 2 arguments: `ctx` and `next`. Argument `ctx` contains an [`ApiResponse`](requests.md) or [`UpdateContext`](updates.md) object, depending on the type of operation. The second argument `next` is a function, which executes the next handler.

Due to the fact that the  `next()`  function returns a promise, so we can use the following  result inside our middleware:

```typescript
airgram.use(async (ctx, next) => {
  const start = new Date()
  const { request } = ctx
  const result = await next()
  console.log(`Method: ${request.method}, params: ${JSON.stringify(request.params)}, result: ${JSON.stringify(result)}, ${new Date() - start}ms`)
})
```

### Class as a middleware

In some cases, middleware may be quite complicated, then the most appropriate way is to create new class \(or use existing\) and pass it to `use()` or `on()` methods.

That class must have a `middleware()`  method:

```typescript
class MiddlewareClass {
  handle(ctx) {
    // do some work
  }
  
  middleware() {
    return (ctx, next) => {
      this.handle(ctx)
      return next()
    }
  }
}

airgram.use(new MiddlewareClass())
```



