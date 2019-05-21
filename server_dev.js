const {createServer} = require('http')
const {generateSitemapOnStory} = require('./src/api/sitemap')
const port = parseInt(process.env.PORT, 10) || 4444
const {forwardMail} = require('./src/api/forwardMail')


createServer((req, res) => {
  if (req.url === '/sitemap.xml') {
    return generateSitemapOnStory(req, res)
  }

  if (req.url === '/api/forms') {
    return forwardMail(req, res)
  }

  res.end('server runs in dev mode.')
}).listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
