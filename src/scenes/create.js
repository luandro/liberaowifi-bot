const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')
const Composer = require('telegraf/composer')

const step2 = new Composer()
const step3 = new Composer()
let speed = null
let router = null

step2.use(ctx => {
  if (ctx.update.message) {
    speed = ctx.update.message.text
    ctx.reply(
      'Grato' +
        '\n' +
        'Qual a marca e modelo dos equipamentos como modem, roteador e similares (Ativos de rede)?'
    )
  }

  return ctx.wizard.next()
})

step3.use(ctx => {
  if (ctx.update.message) {
    router = ctx.update.message.text
    ctx.reply(`Grato! \n Velocidade: ${speed} \n Roteador: ${router} `)
    console.log(speed, router)
  }
  return ctx.scene.leave()

  //   return ctx.wizard.next()
})

module.exports = new WizardScene(
  'create',
  async ctx => {
    await ctx.reply('Vamos precisar de algumas informações.')
    await ctx.reply(
      'Qual sua velocidade de conexão (Largura de banda contratada)?'
    )
    return ctx.wizard.next()
  },
  step2,
  step3
)
