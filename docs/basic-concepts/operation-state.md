# Operation state

Since middlewares are meant to be composed, they need an easy way to send metadata about the operation down the chain of middleware. To accomplish this, each middleware context has a state object. The state is read by using `ctx.getState()` and written using `ctx.setState(newState)` or `ctx.setState((prevState) => newState)`. The API of `setState` is meant to be similar to React's one. For example:

```typescript
airgram.use(({ setState }, next) => {
  setState({ foo: 'bar' })
  return next()
})

airgram.use(async ({ getState }) => {
  console.log(`foo = ${getState().foo}`);
  // output: foo = bar
})
```

To set the initial state, pass it by the request options.

```typescript
async function downloadFile(file) {
  //
}

airgram.on('getFile', async ({ getState, setState }, next) => {
  const { download } = getState()
  if(download) {
    setState({ willBeDownloaded: true })
    const { response } = await next()
    await downloadFile(response)
  } else {
    return next()
  }
})

const state = { download: true }

airgram.api.getFile({ fileId: 1 }, { state }).then(({ getState }) => {
  const { willBeDownloaded } = getState()
  console.info(`willBeDownloaded: ${willBeDownloaded}`) // output: true
})
```

