import Header from './toolbar/Header';
import Footer from './Footer';
import React from 'react';
import AppHead from './AppHead';
import ExternalScripts from '../external-scripts/ExternalScripts';
import DrawerElement from './drawer/DrawerElement';
const Layout = ({ children, 
// appSetup,
settings }) => {
    // console.log('layout render')
    return (React.createElement(React.Fragment, null,
        React.createElement(AppHead, { settings: settings }),
        React.createElement(Header, { settings: settings }),
        children,
        React.createElement(DrawerElement, { settings: settings }),
        React.createElement(Footer, { settings: settings }),
        React.createElement(ExternalScripts, { settings: settings })));
};
// export default memo<{children: ReactNode, settings:GlobalStoryblok}>(Layout)
export default Layout;
