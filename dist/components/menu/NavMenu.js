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
import * as React from 'react';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SbEditable from 'storyblok-react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Components from '@components';
import MenuItem from '@material-ui/core/MenuItem';
import ContentLink from '../link/ContentLink';
import LmIcon from '../icon/LmIcon';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import { useRouter } from 'next/router';
var useStyles = makeStyles({
    paper: function (props) { return ({
        borderRadius: props.border_radius
    }); }
});
var NavMenu = function (_a) {
    var content = _a.content;
    var _b;
    var classes = useStyles(content);
    var _c = React.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var menuItems = content.body || [];
    var isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item';
    var router = useRouter();
    var asPath = router === null || router === void 0 ? void 0 : router.asPath;
    useEffect(function () {
        handleClose();
    }, [asPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var addons = {};
    if (content.alignment === 'bottomStart') {
        addons = {
            getContentAnchorEl: null,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }
        };
    }
    else if (content.alignment === 'bottomEnd') {
        addons = {
            getContentAnchorEl: null,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            },
            transformOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        };
    }
    var ExpandIcon = (content.icon && content.icon.name) ? React.createElement(LmIcon, { iconName: content.icon.name }) : React.createElement(ChevronDown, null);
    var CloseIcon = (content.icon_collapse && content.icon_collapse.name) ?
        React.createElement(LmIcon, { iconName: content.icon_collapse.name }) : React.createElement(ChevronUp, null);
    // const StartIcon = content.start_icon?.name ? <LmIcon iconName={content.start_icon.name} /> : null
    return (React.createElement(SbEditable, { content: content },
        React.createElement(React.Fragment, null,
            React.createElement(Button, { endIcon: Boolean(anchorEl) ? CloseIcon : ExpandIcon, startIcon: ((_b = content.start_icon) === null || _b === void 0 ? void 0 : _b.name) && React.createElement(LmIcon, { iconName: content.start_icon.name }), "aria-controls": "simple-menu", "aria-haspopup": "true", className: "lm-default-color", onClick: handleClick }, content.title),
            React.createElement(Menu, __assign({ open: Boolean(anchorEl), onClose: handleClose, anchorEl: anchorEl, classes: {
                    paper: classes.paper
                } }, addons),
                isCustom && menuItems.map(function (blok) { return Components(blok); }),
                !isCustom && (React.createElement("div", null, menuItems.map(function (nestedProps) { return (React.createElement(ContentLink, { key: nestedProps._uid, className: 'lm-nav-men__link', content: nestedProps },
                    React.createElement(MenuItem, null, nestedProps.label))); })))))));
};
export default NavMenu;
