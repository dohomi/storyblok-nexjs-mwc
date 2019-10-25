import { createServer, IncomingMessage, ServerResponse } from 'http'
import next from 'next'
import appRoutes from './routes'
import { parse } from 'url'
import sitemapFunc from '../src/pages/api/sitemap'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handle = appRoutes.getRequestHandler(app)
// @ts-ignore
const handle = appRoutes.getRequestHandler(app, ({ req, res, route, query }: { req: IncomingMessage, res: ServerResponse, route: any, query: any }) => {
  const parsedUrl = parse(req.url!, true)
  const { pathname } = parsedUrl

  console.log('server', pathname, query)
  if (pathname === '/sitemap.xml') {
    return sitemapFunc(req, res)
  }
  app.render(req, res, route.page, query)
})
app.prepare()
  .then(() => {
    createServer(handle).listen(port, () => {
      // if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
