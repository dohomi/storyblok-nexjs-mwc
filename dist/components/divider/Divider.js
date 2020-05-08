import SbEditable from 'storyblok-react';
import clsx from 'clsx';
import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import LmIcon from '../icon/LmIcon';
const useStyles = makeStyles({
    hSeparator: {
        clear: 'both',
        width: '100%',
        color: '#ccc',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '1px',
        '& > div, > div > div > div': {
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderColor: 'transparent'
        },
        '& div > span:before': {
            right: '100%'
        },
        '& div > span:after': {
            left: '100%'
        },
        '& div > span:before, & div > span:after': {
            content: '""',
            display: 'inline-block',
            verticalAlign: 'top',
            position: 'absolute',
            top: '50%',
            height: 0,
            width: '2000px',
            borderTopWidth: 'inherit',
            borderTopStyle: 'solid',
            borderColor: 'currentColor'
        },
        '& div > span': {
            display: 'inline-block',
            verticalAlign: 'top',
            position: 'relative',
            height: 'inherit',
            borderColor: 'inherit',
            color: 'inherit',
            borderTopWidth: 'inherit',
            borderTopStyle: 'solid',
            '&> .material-icons': {
                color: 'inherit'
            }
        }
    },
    hSeparatorIcon: {
        height: '24px',
        textAlign: 'center',
        '&.large': {
            height: '32px'
        },
        '& div > div > i': {
            '&:before': {
                marginRight: '15px'
            },
            '&:after': {
                marginLeft: '15px'
            }
        }
    }
});
const Wrap = ({ content, children, style, className, childStyle }) => (React.createElement(SbEditable, { content: content },
    React.createElement("div", { className: className, style: style },
        React.createElement("div", { style: childStyle }, children))));
const Divider = ({ content }) => {
    const classes = useStyles();
    const style = {};
    const iconName = content.icon && content.icon.name;
    const iconSize = content.size;
    if (content.color && content.color.rgba) {
        style.color = content.color.rgba;
    }
    if (iconSize) {
        style.height = `${iconSize}px`;
    }
    const className = clsx(classes.hSeparator, iconName && classes.hSeparatorIcon, content.class_names && content.class_names.values);
    const childStyle = {
        borderTopWidth: `${content.thickness || 1}px`
    };
    if (content.width) {
        childStyle.width = `${content.width}%`;
    }
    if (iconName) {
        return (React.createElement(Wrap, { content: content, style: style, childStyle: childStyle, className: className },
            React.createElement("div", null,
                React.createElement("div", { style: { borderTopWidth: `${content.thickness || 1}px` } },
                    React.createElement("span", null,
                        React.createElement(LmIcon, { iconName: iconName, style: {
                                fontSize: iconSize + 'px',
                                marginTop: `${content.thickness || 1}px`
                            } }))))));
    }
    return (React.createElement(Wrap, { content: content, style: style, childStyle: childStyle, className: className },
        React.createElement("span", null)));
};
export default Divider;
