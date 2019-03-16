const {createServer} = require('http')
const generateSitemap = require('./src/api/sitemap')
const port = parseInt(process.env.PORT, 10) || 4000

createServer((req, res) => {
  if (req.url === '/sitemap.xml') {
    return generateSitemap(req, res)
  }

  res.end('server runs in dev mode.')
}).listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
