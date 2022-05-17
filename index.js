const { 
    Telegraf, Markup 
} = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN )
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.on('sticker', (ctx) => ctx.reply('👍'))// ответ на отслеживаемое условие получение СТИКЕРА
bot.hears('hi', (ctx) => ctx.reply('Hey there'))// ответ на получение текста

bot.command('course', async (ctx)=>{
    try{
        await ctx.replyWithHTML('<b>Курсы</b>',Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btm_1'), Markup.button.callback('Обзоры', 'btm_2'), Markup.button.callback('Редакторы', 'btm_3')],
                [Markup.button.callback('Обзоры', 'btm_4')]
            ]
        ))
    }catch (e){
        console.error(e) 
    }
})

function addActionBoot (name, src, text) {
    bot.action(name, async (ctx) => {
        try{
            ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        }catch (e){
            console.error(e) 
        }
    })
}
addActionBoot('btm_1', './img/1.jpg', text.text1)
addActionBoot('btm_2', './img/2.jpg', text.text2)
addActionBoot('btm_3', false, text.text3)
addActionBoot('btm_4', false, text.text4)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))