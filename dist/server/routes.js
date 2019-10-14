import routes from 'next-routes';
var appRoutes = new routes()
    .add('index', '/:slug+');
var NextRoutesLink = appRoutes.Link, Router = appRoutes.Router;
var Link = NextRoutesLink;
export { Link, Router };
export default appRoutes;
