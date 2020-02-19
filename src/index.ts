import { resolve } from 'path'

import koa from 'koa'
import { load } from '@spksoft/koa-decorator'

import t1Worker from './workers/tasks/t1.worker'
import t2Worker from './workers/tasks/t2.worker'
import t3Worker from './workers/tasks/t3.worker'

const app = new koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const router = load(resolve(__dirname, 'controllers'), '.controller.ts')

t1Worker.on('ready', () => console.log('t1Work ready'))

t2Worker.on('ready', () => console.log('t2Work ready'))
t3Worker.on('ready', () => console.log('t3Work ready'))

app.use(router.routes()).use(router.allowedMethods())

app.listen(<number>port, host, () => {
  console.log(`Server is running at http:${host}:${port}`)
})
