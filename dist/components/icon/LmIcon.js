import InlineSVG from 'react-inlinesvg';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles/';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
var underscoreToMinus = function (str) { return str.replace(/_/g, '-'); };
var useStyles = makeStyles({
    icon: {
        fill: 'currentColor',
        width: '1em',
        height: '1em'
    }
});
var iconMap = {
    call: 'phone',
    people: 'account-multiple',
    access_time: 'clock-outline',
    compare_arrows: 'compare',
    keyboard_arrow_down: 'chevron-down'
};
var LmIcon = function (_a) {
    var _b;
    var className = _a.className, style = _a.style, iconName = _a.iconName, buttonSize = _a.buttonSize, iconUrl = _a.iconUrl;
    var classes = useStyles();
    var _c = useInView(intersectionDefaultOptions), refIntersectionObserver = _c[0], inView = _c[1];
    iconName = iconName ? iconMap[iconName] || iconName : undefined;
    var iconSrc = '';
    if (inView && (iconUrl || iconName)) {
        iconSrc = iconUrl ? iconUrl : "https://cdn.jsdelivr.net/npm/@mdi/svg/svg/" + underscoreToMinus(iconName) + ".svg";
    }
    return (iconName || iconUrl) ? (React.createElement(React.Fragment, null,
        iconSrc && React.createElement(InlineSVG, { style: style, className: clsx(classes.icon, 'lm-svg-icon', className, (_b = {}, _b['size__' + buttonSize] = buttonSize, _b)), onError: function () {
                console.error("Icon not found: " + iconName);
                // console.error(e)
            }, src: iconSrc }),
        React.createElement("span", { ref: refIntersectionObserver }))) : null;
};
export default LmIcon;
