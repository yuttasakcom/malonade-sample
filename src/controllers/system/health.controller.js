import { route, HttpMethod } from '@spksoft/koa-decorator'

@route('/system')
class Health {
  @route('/health', HttpMethod.GET)
  async health(ctx) {
    ctx.body = 'OK'
  }
}
