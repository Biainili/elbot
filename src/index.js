const { Telegraf, 
    Markup 
} = require('telegraf');
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 
    'Незнакомец '}!`));
bot.help((ctx) => ctx.reply(text.commandes));

bot.command('low', async (ctx)=>{
    try {
        await ctx.replyWithHTML('<b>Юридические Услуги</b>', Markup.inlineKeyboard(
            [
              [Markup.button.callback('Миграция в Армении', 'btn_1')],
              [Markup.button.callback('Открытие Фирмы в Армении', 'btn_2')],
              [Markup.button.callback('Счет в банке Армении', 'btn_3')],
              [Markup.button.callback('ВНЖ Армении ', 'btn_4')],
              [Markup.button.callback('Подача на Визу', 'btn_5')],
              [Markup.button.callback('Менежмент Бизнеса в Армении', 'btn_6')]
            ]
        ))
    } catch(e){
        console.error(e)
    } 
})   

function addActionBot(name, src, text){
bot.action(name, async(ctx) => {
    try {
      await ctx.answerCbQuery()
      if(src !== false) {
        await ctx.replyWithPhoto({
            source: src 
        })
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview :true
      })
    } catch(e){
        console.error(e)
    } 
})
}
addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)
addActionBot('btn_4', false, text.text3)
addActionBot('btn_5', false, text.text3)
addActionBot('btn_6', false, text.text3)

bot.launch(); 

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));