const { debug } = require('../helpers/logger'),
getArticle = require('./helpers/getArticle')

module.exports = async (client, app) => {
  debug('started')
  app.set('views', `${__dirname}/templates`)
  app.disable('x-powered-by')
  app.get('/api/articles/:channelId/:messageId', async (req, res) => {
    const article = await getArticle(client, req.params.channelId, req.params.messageId)
    if (!article || !isNaN(article)) return res.status(isNaN(article) ? 500 : article).send('error')
    res.json(article)
  })
}