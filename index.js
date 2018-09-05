const TelegramBot = require('node-telegram-bot-api');
const request = require('request')
const language = require('@google-cloud/language');

const languageClient = new language.LanguageServiceClient();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if(msg.chat.title === "Sunway Tech Club Geeks"){
    if(msg.new_chat_member !== undefined){
      bot.sendMessage(chatId, `@${msg.new_chat_member.username} Welcome to Sunway Tech C̶u̶l̶t̶ Club!!!`)
    }
  }

  if(msg.text !== undefined){
    message = msg.text.toString().toLowerCase()
    if(message.includes('1984')){
      bot.sendMessage(chatId, `@${msg.from.username === undefined ? msg.from.first_name : msg.from.username} Big Brother is watching you!`)
    } else if(message.includes('monika') || message.includes('doki') || message.includes('yuri') || message.includes('sayori') || message.includes('natsuki')){
      bot.sendMessage(chatId, `${msg.from.first_name}${msg.from.last_name === undefined ? '' : '_' + msg.from.last_name.replace(' ', '_')}.chr deleted successfully.`)
    } else if(message.includes('happy') || message.includes('birthday')) {
      bot.sendMessage(chatId, `Thanks @${msg.from.username === undefined ? msg.from.first_name : msg.from.username}!`)
    }else {
      languageClient
        .analyzeSentiment({document: {content: message, type: 'PLAIN_TEXT', language: 'EN'}})
        .then(results => {
          const sentiment = results[0].documentSentiment;
          if(sentiment.score < -0.5){
            bot.sendMessage(chatId, `@${msg.from.username === undefined ? msg.from.first_name : msg.from.username} This is so sad! Alexa, can we play Despacito ${Math.floor((Math.random() * 1000) + 1)}`)
          }
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }
  }

});