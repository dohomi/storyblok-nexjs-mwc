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
import clsx from 'clsx';
import { TopAppBar } from '@rmwc/top-app-bar';
import scrollPositionHook from '../../../utils/hooks/scrollPositionHook';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider';
import { useRouter } from 'next/router';
function getClassName(props, pos) {
    var _a;
    if (pos === void 0) { pos = 0; }
    var toolbarConfig = props.toolbarConfig || [];
    return clsx('lm-toolbar', (_a = {},
        _a['lm-toolbar__bold-text'] = toolbarConfig.includes('text_bold'),
        _a['lm-toolbar__fixed-width'] = toolbarConfig.includes('fixed_width'),
        _a['lm-toolbar-transparent'] = props.transparentToolbar && pos < 128,
        _a));
}
var TopAppBarWrap = function (props) {
    var dimensions = useWindowDimensions();
    var asPath = useRouter().asPath;
    var scrollPos = scrollPositionHook();
    var _a = __read(useState(getClassName(props)), 2), className = _a[0], setClassName = _a[1]; // because of server/client hydration
    // let className = getClassName()
    useEffect(function () {
        setClassName(getClassName(props, scrollPos)); // todo is this necessary? maybe different approach
    }, [scrollPos, props.transparentToolbar, dimensions, asPath]);
    return (<TopAppBar className={className} fixed={props.fixed}>
      {props.children}
    </TopAppBar>);
};
var TopAppBarBridge = function (props) {
    if (!props.transparentToolbar) {
        return (<TopAppBar className={getClassName(props)} fixed={props.fixed}>
        {props.children}
      </TopAppBar>);
    }
    return <TopAppBarWrap {...props}/>;
};
export default TopAppBarBridge;
