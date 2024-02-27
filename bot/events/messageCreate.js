const Discord = require('discord.js'),
{ debug, error } = require('../../helpers/logger')

module.exports = {
  execute: async (client, message) => {
    if (message.author.bot) return
    // if (client.config.newsChannels.includes(message.channel.id)) {
    //   debug(`article ${message.id} sent in ${message.channel.id}`)
    //   const articleCommentsThread = await message.startThread({
    //     name: `[${parseInt(message.id.slice(-6)).toString(16)}] Comments`,
    //     reason: `Comment section`,
    //     autoArchiveDuration: 60
    //   })
    //   articleCommentsThread.send({
    //     embeds: [
    //       new Discord.MessageEmbed()
    //       .setColor(client.config.colors.primary)
    //       .setDescription(`[See on RoyaliTEA](https://royalitea.piggyplex.net/articles/${message.channel.id}/${message.id})`)
    //     ]
    //   })
    //   setTimeout(() => {
    //     if (message.deleted) articleCommentsThread.delete().catch(() => {})
    //   }, 5 * 1000)
    //   setTimeout(() => {
    //     if (message.deleted) articleCommentsThread.delete().catch(() => {})
    //   }, 10 * 1000)
    //   setTimeout(() => {
    //     if (message.deleted) articleCommentsThread.delete().catch(() => {})
    //   }, 30 * 1000)
    //   return
    // }
    // if (!message.content.startsWith(client.config.prefix)) return
    // const args = message.content.slice(client.config.prefix.length).trim().split(/ /g),
    // commandName = args.shift().toLowerCase()
    // let command
    // if (client.commands.has(commandName)) {
    //   command = client.commands.get(commandName)
    // } else if (client.aliases.has(commandName)) {
    //   command = client.aliases.get(commandName)
    // } else {
    //   // Command is not found
    //   return
    // }
    // try {
    //   debug(`command "${message.content}" invoked by ${message.author.id} in ${message.guild?.id}`)
    //   command.execute(client, message, args)
    // } catch (err) {
    //   const ref = new Date().getTime().toString(16)
    //   error(`command "${message.content}" by ${message.author.id} in ${message.guild?.id} returned error:`, err)
    //   message.reply(`something went wrong.\nref: \`${ref}\``)
    // }
  }
}