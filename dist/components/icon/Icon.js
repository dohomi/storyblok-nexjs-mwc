import SbEditable from 'storyblok-react';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import LmIcon from './LmIcon';
var useStyles = makeStyles({
    icon: {
        '&.xmall': {
            fontSize: '1rem'
        },
        '&.small': {
            fontSize: '1.25rem'
        },
        '&.medium': {
            fontSize: '1.5rem'
        },
        '&.large': {
            fontSize: '2.25rem'
        },
        '&.xlarge': {
            fontSize: '2.5rem'
        },
        '&.xxlarge': {
            fontSize: '3rem'
        },
        '&.xxxlarge': {
            fontSize: '4rem'
        }
    }
});
var IconMwc = function (_a) {
    var _b;
    var content = _a.content;
    var classes = useStyles();
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx(content.class_names && content.class_names.values) },
            React.createElement(LmIcon, { className: clsx(classes.icon, (_b = {},
                    _b[content.size] = !!content.size,
                    _b)), iconUrl: content.icon_url, style: { color: (content.color && content.color.rgba) ? content.color.rgba : undefined }, iconName: content.name && content.name.name }))));
};
export default IconMwc;
