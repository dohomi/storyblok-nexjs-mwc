import { createServer, IncomingMessage, ServerResponse } from 'http'
import next from 'next'
import appRoutes from './routes'
import { resolve } from 'path'
const { parse } = require('url')

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = appRoutes.getRequestHandler(app)

app.prepare()
  .then(() => {
    createServer((req: IncomingMessage, res: ServerResponse) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      const publicPath = resolve(__dirname, '../public')
      console.log('SERVER:::', pathname)
      if (pathname === '/favicon.ico') {
        console.log('from server: ', console.log(publicPath))
        // const currentPath = __dirname + '/public/' + path

        // console.log(currentPath)
        return app.serveStatic(req, res, publicPath + pathname)
      }
      return handle(req, res)
    }).listen(port, () => {
      // if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
