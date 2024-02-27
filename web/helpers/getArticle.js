const { error } = require('../../helpers/logger'),
{ inHTMLData: sanitize } = require('xss-filters'),
{ normalize, schema } = require('normalizr'),
md = require('markdown-it')()

const userRolesEntity = new schema.Entity('userRoles')
const userEntity = new schema.Entity('users', {
  roles: [ userRolesEntity ]
})
const messageStructure = { author: userEntity }
// const articleEntity = new schema.Entity('articles', {
//   message: messageStructure,
//   comments: [ messageStructure ]
// })
const articleStructure = {
  message: messageStructure,
  comments: [ messageStructure ]
}

module.exports = async (client, channelId, messageId) => {
  if (!client.ready) return 503
  if (!client.config.newsChannels.includes(channelId)) return 400
  const channel = client.channels.cache.get(channelId)
  if (!channel) {
    error(`error finding channel at ${channelId}`)
    return 404
  }
  const message = await (channel.messages.fetch(messageId).catch((err) => {
    error(`error finding article at ${channelId}/${messageId} (this error usually means the message wasn't found):`, err)
    return 404
  }))
  if (!message.hasThread) return 400
  const threadMessages = []
  let lastFetchedMessageId
  while (true) {
    const options = { limit: 100 }
    if (lastFetchedMessageId) {
        options.before = lastFetchedMessageId
    }
    const messages = await message.thread.messages.fetch(options)
    threadMessages.push(...messages.map(message => message))
    lastFetchedMessageId = messages.last().id
    if (messages.size != 100 || threadMessages >= limit) {
      break
    }
  }
  let commentMessages = threadMessages.filter(message => !message.author.bot)
  const formatMessage = async (message, user) => {
    const member = message.member || await (message.guild.members.fetch(message.author.id)).catch(() => {}) || {}
    const messageData = {
      id: message.id,
      content: md.render(sanitize(message.content)).trim(),
      time: message.createdTimestamp,
      author: {
        id: user.id,
        displayName: member.displayName,
        username: user.username,
        discriminator: user.discriminator,
        tag: user.tag,
        avatar: user.displayAvatarURL(),
        color: member.displayHexColor,
        roles: member.roles ? member.roles.cache.map(role => ({ name: role.name, id: role.id, color: role.hexColor, position: role.position })) : undefined
      }
    }
    if (message.attachments.size) {
      messageData.files = message.attachments.map(attachment => attachment.proxyURL)
    }
    if (message.stickers.size) {
      messageData.stickers = message.stickers.map(sticker => sticker.url)
    }
    if (message.reference) {
      messageData.reference = message.reference.messageId
    }
    return messageData
  }
  const comments = []
  for (let i = 0; i < commentMessages.length; i++) {
    const comment = commentMessages[i]
    comments.push(await formatMessage(comment, comment.author))
  }
  return normalize({
    message: await formatMessage(message, message.author),
    comments
  }, articleStructure)
}