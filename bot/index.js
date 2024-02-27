const fs = require('fs'),
{ debug, warn } = require('../helpers/logger')

module.exports = (client, app) => {
  client.commands = new Map()
  client.aliases = new Map()
  client.config = require(`${process.cwd()}/config`)
  debug(`started`)
  const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'))
  eventFiles.forEach(eventFile => {
    const event = require(`./events/${eventFile}`)
    debug(`loading event "${eventFile}" (once = ${event.once ? true : false})`)
    client[event.once ? 'once' : 'on'](eventFile.split('.')[0], (...args) => event.execute(client, ...args))
  })
  const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'))
  commandFiles.forEach(commandFile => {
    const command = require(`./commands/${commandFile}`)
    if (!command.name) return warn(`cannot import command "${commandFile}"`)
    debug(`loading command "${commandFile}"`)
    client.commands.set(command.name, command)
    if (command.aliases) {
      command.aliases.forEach(alias => client.aliases.set(alias, command))
    }
  })
  client.login(client.config.token)
}