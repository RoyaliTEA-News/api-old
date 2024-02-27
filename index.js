const client = new (require ('discord.js').Client)({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_WEBHOOKS'],
  allowedMentions: {
    repliedUser: false
  },
  reply: {
    failIfNotExists: false
  }
}),
app = require('express')(),
config = require('./config'),
{ debug, success } = require('./helpers/logger')

debug(`started`)

require('./bot')(client, app)
require('./web')(client, app)

const listener = app.listen(config.port, () => {
  success(`started on http://localhost:${listener.address().port}`)
})