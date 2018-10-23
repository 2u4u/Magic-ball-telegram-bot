const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const config = require('config') 

const TOKEN = config.get('token')
const bot = new Telegraf(TOKEN)

const answersArray = [
  'Бесспорно',
  'Предрешено',
  'Никаких сомнений',
  'Определённо да',
  'Можешь быть уверен в этом',
  'Мне кажется — «да»',
  'Вероятнее всего',
  'Хорошие перспективы',
  'Знаки говорят — «да»',
  'Да',
  'Пока не ясно, попробуй снова',
  'Спроси позже',
  'Лучше не рассказывать',
  'Сейчас нельзя предсказать',
  'Сконцентрируйся и спроси опять',
  'Даже не думай',
  'Мой ответ — «нет»',
  'По моим данным — «нет»',
  'Перспективы не очень хорошие',
  'Весьма сомнительно'
]

const answersArrayEn = [
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes — definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Signs point to yes',
  'Yes',
  'Reply hazy, try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  'Don’t count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful'
]

let lang, answer

bot.command('start', (ctx) => {
  lang = ctx.update.message.from.language_code
  if (lang.match(/ru/)) {
    ctx.reply('Задай свой вопрос', Markup.keyboard(['Я задал свой вопрос в уме'])
      .resize()
      .extra()
    )
  } else {
    ctx.reply('Please ask your question', Markup.keyboard(['I asked in my mind'])
    .resize()
    .extra()
  )}
})

bot.on('message', (ctx) => {
  console.log(ctx.update.message.from.language_code)
  lang = ctx.update.message.from.language_code
  if (lang.match(/ru/)) {
    answer = answersArray[Math.floor(Math.random() * answersArray.length)]
  } else {
    answer = answersArrayEn[Math.floor(Math.random() * answersArrayEn.length)]
  }
  ctx.reply(answer, Markup.keyboard(['Я задал свой вопрос в уме'])
    .resize()
    .extra()
  )
})

bot.use(session())
bot.startPolling()
