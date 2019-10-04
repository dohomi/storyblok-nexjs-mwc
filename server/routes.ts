import routes from 'next-routes'

const appRoutes = new routes()
  .add('index', '/:slug+')

const { Link, Router } = appRoutes
export { Link, Router }
export default appRoutes
