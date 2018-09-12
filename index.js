const TelegramBot = require('node-telegram-bot-api');
const request = require('request')
const language = require('@google-cloud/language');
var http = require("http");

const languageClient = new language.LanguageServiceClient(/*{
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  }
}*/);

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
      bot.sendMessage(chatId, `@${msg.new_chat_member.username === undefined ? msg.new_chat_member.first_name : msg.new_chat_member.username} Welcome to Sunway Tech C̶u̶l̶t̶ Club!!!`)
    }
  } else if(msg.chat.title === "STC Committee"){
    if(msg.new_chat_member !== undefined){
      bot.sendMessage(chatId, `@${msg.new_chat_member.username === undefined ? msg.new_chat_member.first_name : msg.new_chat_member.username} Welcome to STC Committee!!!`)
    }
  } 

  if(msg.text !== undefined){
    message = msg.text.toString().toLowerCase()
    if(message.includes('1984')){
      bot.sendMessage(chatId, `@${msg.from.username === undefined ? msg.from.first_name : msg.from.username} Big Brother is watching you!`)
    } else if(message.includes('monika') || message.includes('doki') || message.includes('yuri') || message.includes('sayori') || message.includes('natsuki')){
      bot.sendMessage(chatId, `${msg.from.first_name}${msg.from.last_name === undefined ? '' : '_' + msg.from.last_name.replace(' ', '_')}.chr deleted successfully.`)
    } else if(message.includes('happy') && message.includes('birthday')) {
      bot.sendMessage(chatId, `Thanks @${msg.from.username === undefined ? msg.from.first_name : msg.from.username}!`)
    } else {
//       languageClient
//         .analyzeSentiment({document: {content: message, type: 'PLAIN_TEXT'}})
//         .then(results => {
//           const sentiment = results[0].documentSentiment;
//           if(sentiment.score < -0.8){
//             bot.sendMessage(chatId, `@${msg.from.username === undefined ? msg.from.first_name : msg.from.username} We had detected the extremely depressed message of yours. For your psychological wealth being, we advice you to seek for counselling. Cheers!`)
//           }
//         })
//         .catch(err => {
//           console.error('ERROR:', err);
//         });
    }
  }

});

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(process.env.PORT || 5000);
