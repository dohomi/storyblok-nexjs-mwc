import routes, { LinkProps } from 'next-routes';
import { ComponentType } from 'react';
declare const appRoutes: routes;
declare const Router: import("next-routes").Router;
export declare type NextLinkProps = Omit<LinkProps, 'route'> & {
    to?: string;
    route?: string;
    params?: {
        [k: string]: string | number;
    };
    passHref?: boolean;
    prefetch?: boolean;
};
declare const Link: ComponentType<NextLinkProps>;
export { Link, Router };
export default appRoutes;
