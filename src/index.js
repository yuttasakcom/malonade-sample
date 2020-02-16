import { resolve } from 'path'

import koa from 'koa'
import { load } from '@spksoft/koa-decorator'

const app = new koa()
const router = load(resolve(__dirname, 'controllers'), '.controller.js')

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log(`Server running at http://localhost:3000`)
