import { route, HttpMethod } from '@spksoft/koa-decorator'
import { Context } from 'koa'
import { Admin } from '@melonade/melonade-client'

const kafkaServers = 'localhost:29092'
const namespace = 'docker-compose'

@route('/trigger')
class BroadcastCompensate {
  @route('/broadcast_compensate', HttpMethod.GET)
  async broadcastCompensate(ctx: Context) {
    const adminClient = new Admin({
      kafkaServers,
      namespace,
    })

    adminClient.on('ready', () => {
      adminClient.startTransaction(
        new Date().toISOString(),
        {
          name: 'wfm_drop_task',
          rev: '1',
        },
        {
          chanel: 'hello',
          msg: { id: 1, name: 'yo' },
        },
        ['aa', 'bb', 'cc']
      )
    })

    ctx.body = 'OK'
  }
}
