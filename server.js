const {createServer} = require('http')
const next = require('next')
const routes = require('./routes/index')
const generateSitemap = require('./src/api/sitemap')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
// const handler = routes.getRequestHandler(app)

const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  if (req.url === '/sitemap.xml') {
    return generateSitemap(req, res)
  }
  app.render(req, res, route.page, query)
})
app.prepare()
  .then(() => {
    createServer(handler)
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
