const { success } = require('../../helpers/logger')

module.exports = {
  once: true,
  execute: (client) => {
    client.ready = true
    client.user.setPresence({ activities: [{ name: '-help', type: 'LISTENING' }] })
    success(`logged in as ${client.user.tag}`)
  }
}