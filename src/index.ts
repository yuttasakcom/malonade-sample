import { resolve } from 'path'

import koa from 'koa'
import { load } from '@spksoft/koa-decorator'

const app = new koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const router = load(resolve(__dirname, 'controllers'), '.controller.ts')

app.use(router.routes()).use(router.allowedMethods())

app.listen(<number>port, host, () => {
  console.log(`Server is running at http:${host}:${port}`)
})
