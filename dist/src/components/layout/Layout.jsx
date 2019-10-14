import Header from './toolbar/Header';
import Footer from './Footer';
import { ThemeProvider } from '@rmwc/theme';
import React, { useEffect } from 'react';
import MwcDrawer from './drawer/MwcDrawer';
import { getThemeOptions } from '../../utils/themeLayout';
import { closeNavigationDrawers } from '../../utils/state/actions';
import { GlobalStateProvider } from '../../utils/state/state';
var Layout = function (_a) {
    var asPath = _a.asPath, settings = _a.settings, children = _a.children, hasFeature = _a.hasFeature;
    useEffect(function () {
        closeNavigationDrawers(); // todo needs testing might need a pure close drawer action
    }, [asPath]);
    var themeOptions = getThemeOptions(settings);
    return (<GlobalStateProvider>
      <ThemeProvider options={themeOptions} className="app__root">
        <MwcDrawer content={settings}/>
        <Header settings={settings} hasFeature={!!hasFeature}/>
        <main>{children}</main>
        <Footer settings={settings}/>
      </ThemeProvider>
    </GlobalStateProvider>);
};
export default Layout;
