import { createServer, IncomingMessage, ServerResponse } from 'http'
import next from 'next'
import appRoutes from './routes'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handle = appRoutes.getRequestHandler(app)
// @ts-ignore
const handle = appRoutes.getRequestHandler(app, ({ req, res, route, query }: { req: IncomingMessage, res: ServerResponse, route: any, query: any }) => {
  app.render(req, res, route.page, query)
})
app.prepare()
  .then(() => {
    createServer(handle).listen(port, () => {
      // if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
