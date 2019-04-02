require('dotenv').config()
const {createServer} = require('http')
const {generateSitemapOnStory} = require('./src/api/sitemap')
const port = parseInt(process.env.PORT, 10) || 4444

createServer((req, res) => {
  if (req.url === '/sitemap.xml') {
    return generateSitemapOnStory(req, res)
  }

  res.end('server runs in dev mode.')
}).listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
