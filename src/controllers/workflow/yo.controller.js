import { route, HttpMethod } from '@spksoft/koa-decorator'

@route('/workflow')
class Yo {
  @route('/yo', HttpMethod.GET)
  async start(ctx) {
    ctx.body = { msg: 'success' }
  }
}
