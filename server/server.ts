import { createServer } from 'http'
import next from 'next'
import appRoutes from './routes'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = appRoutes.getRequestHandler(app)

// const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
//   if (req.url === '/sitemap.xml') {
//     return generateSitemap(req, res)
//   }
//   app.render(req, res, route.page, query)
// })
app.prepare()
  .then(() => {
    createServer(handler)
      .listen(port, () => {
        // if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
