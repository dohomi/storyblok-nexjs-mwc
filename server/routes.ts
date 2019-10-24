import routes, { LinkProps } from 'next-routes'
import { ComponentType } from 'react'

const appRoutes = new routes()
  .add('index', '/:slug+')
  .add('api/sitemap', '/sitemap.xml')

const { Link: NextRoutesLink, Router } = appRoutes

export type NextLinkProps = Omit<LinkProps, 'route'> & {
  to?: string
  route?: string
  params?: { [k: string]: string | number }
  passHref?: boolean
  prefetch?: boolean
}

const Link = NextRoutesLink as ComponentType<NextLinkProps>

export { Link, Router }
export default appRoutes
