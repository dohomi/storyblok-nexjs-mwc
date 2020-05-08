var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import SbEditable from 'storyblok-react';
import * as React from 'react';
import { memo } from 'react';
import NavListItem from './NavListItem';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions';
import { ChevronDown } from 'mdi-material-ui';
import LmIcon from '../icon/LmIcon';
var useStyles = makeStyles({
    root: {
        '& .MuiTypography-root': {
            display: 'inline-block',
            paddingRight: '12px',
            '&:last-child': {
                paddingRight: '0px'
            }
        },
        '&.lm-nav-list__column .MuiTypography-root': {
            display: 'block'
        }
    }
});
var NavList = function (_a) {
    var content = _a.content;
    var classes = useStyles();
    var isMobile = useDeviceDimensions().isMobile;
    var body = content && content.body || [];
    var properties = content.properties || [];
    var header = content.header;
    if ((isMobile && content.collapse_on_mobile) || content.forceCollapse) {
        return (React.createElement(SbEditable, { content: content },
            React.createElement(ExpansionPanel, null,
                React.createElement(ExpansionPanelSummary, { expandIcon: (content.collapse_icon && content.collapse_icon.name) ?
                        React.createElement(LmIcon, { iconName: content.collapse_icon.name }) : React.createElement(ChevronDown, null) },
                    React.createElement(Typography, null, content.header)),
                React.createElement(ExpansionPanelDetails, null,
                    React.createElement("div", { className: clsx('lm-nav-list', content.class_names && content.class_names.values, {
                            'lm-nav-list__column': properties.find(function (i) { return i === 'flex-column'; })
                        }, classes.root) }, body.map(function (blok) { return React.createElement(NavListItem, __assign({}, blok, { key: blok._uid })); }))))));
    }
    var navClassNames = clsx(content.style);
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx('lm-nav-list', content.class_names && content.class_names.values, {
                'lm-nav-list__column': properties.find(function (i) { return i === 'flex-column'; })
            }, classes.root) },
            header && React.createElement("h4", null, header),
            React.createElement("nav", { className: navClassNames }, body.map(function (blok) { return React.createElement(NavListItem, __assign({}, blok, { key: blok._uid })); })))));
};
export default memo(NavList);
