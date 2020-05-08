import InlineSVG from 'react-inlinesvg';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles/';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
const underscoreToMinus = (str) => str.replace(/_/g, '-');
const useStyles = makeStyles({
    icon: {
        fill: 'currentColor',
        width: '1em',
        height: '1em'
    }
});
const iconMap = {
    call: 'phone',
    people: 'account-multiple',
    access_time: 'clock-outline',
    compare_arrows: 'compare',
    keyboard_arrow_down: 'chevron-down'
};
const LmIcon = ({ className, style, iconName, buttonSize, iconUrl }) => {
    const classes = useStyles();
    const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions);
    iconName = iconName ? iconMap[iconName] || iconName : undefined;
    let iconSrc = '';
    if (inView && (iconUrl || iconName)) {
        iconSrc = iconUrl ? iconUrl : `https://cdn.jsdelivr.net/npm/@mdi/svg/svg/${underscoreToMinus(iconName)}.svg`;
    }
    return (iconName || iconUrl) ? (React.createElement(React.Fragment, null,
        iconSrc && React.createElement(InlineSVG, { style: style, className: clsx(classes.icon, 'lm-svg-icon', className, { ['size__' + buttonSize]: buttonSize }), onError: () => {
                console.error(`Icon not found: ${iconName}`);
                // console.error(e)
            }, src: iconSrc }),
        React.createElement("span", { ref: refIntersectionObserver }))) : null;
};
export default LmIcon;
