const fs = require('fs'),
path = require('path'),
pug = require('pug'),
{ debug, error } = require('../../helpers/logger')

module.exports = async (pagename, client) => {
  const route = pagename
  if (pagename.match(/^articles\/\d+\/\d+$/gi)) pagename = 'article'
  const pageDataPath = path.resolve(__dirname, `../templates/pages/${pagename}.js`),
  pagePath = path.resolve(__dirname, `../templates/pages/${pagename}.pug`)
  if (fs.existsSync(pageDataPath) && fs.existsSync(pagePath)) {
    delete require.cache[require.resolve(pageDataPath)]
    const pageData = await require(pageDataPath)({ client, route, pagename })
    try {
      return {
        metadata: pageData.metadata,
        content: pug.renderFile(pagePath, {
          config: client.config,
          ...(pageData.locals || {})
        })
      }
    } catch (err) {
      error(`failed to render "${pagename}":`, err)
      return 500
    }
  } else {
    return 404
  }
}