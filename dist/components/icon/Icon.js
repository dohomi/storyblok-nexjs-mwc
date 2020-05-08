import SbEditable from 'storyblok-react';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import LmIcon from './LmIcon';
const useStyles = makeStyles({
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
const IconMwc = ({ content }) => {
    const classes = useStyles();
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: clsx(content.class_names && content.class_names.values) },
            React.createElement(LmIcon, { className: clsx(classes.icon, {
                    [content.size]: !!content.size
                }), iconUrl: content.icon_url, style: { color: (content.color && content.color.rgba) ? content.color.rgba : undefined }, iconName: content.name && content.name.name }))));
};
export default IconMwc;
