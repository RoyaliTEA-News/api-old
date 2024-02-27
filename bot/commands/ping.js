module.exports = {
  name: 'ping',
  aliases: ['p'],
  category: 'utility',
  execute: (client, message, args) => {
    message.reply('pong')
  }
}