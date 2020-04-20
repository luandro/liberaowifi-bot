const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const welcome = require('./scenes/welcome')
const create = require('./scenes/create')

const { leave } = Stage

module.exports = () => {
  const welcomeSwitch = ctx => {
    console.log(
      '------------------------------------------------------------------------',
      ctx.message.text.split(`\n`)[0]
    )
    if (!ctx.message) return null
    switch (ctx.message.text.split(`\n`)[0]) {
      case '📡':
        return ctx.scene.enter('create')
      //   case '➕':
      //     return ctx.scene.enter('password')
      //   case '➖':
      //     return ctx.scene.enter('questions')
      default:
        return null
    }
  }

  const bot = new Telegraf(process.env.BOT_TOKEN)
  bot.catch((err, ctx) => {
    console.log('Ooops', err)
    ctx.reply('Erro')
    return ctx.scene.leave()
  })
  const stage = new Stage()
  stage.register(welcome, create)
  bot.use(session())
  bot.use(stage.middleware())
  bot.use(async (ctx, next) => {
    if (ctx.message && ctx.message.from) {
      const { id, first_name, username, language_code } = ctx.message.from
      ctx.state.user = {
        id,
        first_name,
        username,
        language_code
      }
    }
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time %sms', ms)
  })
  stage.command('cancel', leave())
  bot.start(ctx => {
    return ctx.scene.enter('welcome')
  })
  bot.on('message', ctx => {
    const action = welcomeSwitch(ctx)
    if (!action) {
      return ctx.scene.enter('welcome')
    }
  })
  bot.startPolling()
  console.log('Telegram BOT running...')
  module.exports = bot
}
