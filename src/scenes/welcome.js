const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')

const welcome = new Scene('welcome')
welcome.enter(async ctx => {
  await ctx.reply('Seja bem vind@s!!')
  await ctx.reply(
    'Em tempos de confinamento, o acesso à internet é um bem indispensável. Muita gente não tem linha fixa ou fibra, nem dinheiro para o 3G'
  )
  await ctx.reply(
    'Se seu wifi tem senha, libere durante a pandemia para que ninguém fique sem acesso e isolado'
  )
  await ctx.reply('A Coolab pode te ajudar a fazer isso!')
  await ctx.reply(
    'Entre em contato por whatsapp, telegram, entre outras redes sociais ou e-mail...'
  )
  //   await ctx.reply(
  //     'Como posso te ajudar?',
  //     Markup.inlineKeyboard([
  //       Markup.callbackButton(
  //         '📡\n' + 'Criar Rede Visitantes para compartilhar sua Rede Wifi'
  //       ),
  //       Markup.callbackButton('🔓\n' + 'Remover senha da sua Rede Wifi'),
  //       Markup.callbackButton('ℹ️\n' + 'Outras dúvidas sobre Rede Wifi')
  //     ]).extra()
  //   )
  ctx.replyWithMarkdown(
    'Como posso ajudar?',
    Markup.keyboard([
      [
        Markup.callbackButton(
          '📡\n' + 'Criar Rede Visitantes para compartilhar sua Rede Wifi'
        )
      ],
      [Markup.callbackButton('🔓\n' + 'Remover senha da sua Rede Wifi')],
      [Markup.callbackButton('ℹ\n' + 'Outras dúvidas sobre Rede Wifi')]
    ]).extra()
  )
  return ctx.scene.leave()
})

module.exports = welcome
