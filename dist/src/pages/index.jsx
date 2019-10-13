var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import Components from 'components';
import React, { useEffect, useState } from 'react';
import StoryblokService from '../utils/StoryblokService';
import Head from '../components/layout/Head';
import Layout from '../components/layout/Layout';
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider';
import DeviceDetectService from '../utils/DeviceDetectService';
import Fonts from 'fonts';
import { useRouter } from 'next/router';
import Error from '../pages/_error';
import getInitialPageProps from '@initialData/getInitialPageProps';
var CoreIndex = function (props) {
    var settings = props.settings, pageSeo = props.pageSeo, hasFeature = props.hasFeature, asPath = props.asPath, page = props.page;
    return (<>
      <Head settings={settings} pageSeo={pageSeo}/>
      <WindowDimensionsProvider>
        <Layout settings={settings} hasFeature={hasFeature} asPath={asPath}>
          {Components(page)}
        </Layout>
      </WindowDimensionsProvider>
      <script> /* fix FF initial render *//* fix FF initial render */</script>
    </>);
};
var StoryblokIndex = function (props) {
    var _a = __read(useState(props), 2), content = _a[0], setContent = _a[1];
    var asPath = props.asPath;
    useEffect(function () {
        setContent(props);
    }, [asPath]);
    useEffect(function () {
        StoryblokService.initEditor(content, setContent);
    }, []);
    return <CoreIndex {...content}/>;
};
var Index = function (props) {
    var _a = useRouter(), asPath = _a.asPath, query = _a.query;
    var settings = props.settings, page = props.page, error = props.error;
    useEffect(function () {
        Fonts(settings);
        DeviceDetectService.setAppServices();
    }, []);
    if (error) {
        return <Error statusCode={error.status} settings={settings} page={page}/>;
    }
    if (query._storyblok) {
        return <StoryblokIndex {...props} asPath={asPath}/>;
    }
    return <CoreIndex {...props} asPath={asPath}/>;
};
Index.getInitialProps = getInitialPageProps;
export default Index;
