import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import LmMuiAvatar from '../avatar/LmMuiAvatar';
import ContentLink from '../link/ContentLink';
import LmIcon from '../icon/LmIcon';
// fab and button: small medium large, default: large
const mapSize = {
    dense: 'small',
    'lm-button-large': 'large'
};
const mapIconButtonSize = {
    dense: 'small'
};
const mapAvatarSize = {
    dense: 'small',
    'lm-button-large': 'large',
    'lm-button-xlarge': 'xlarge'
};
const mapVariant = {
    'raised': 'contained',
    'outlined': 'outlined',
    'unelevated': 'contained'
};
const mapColor = {
    'dark': 'primary',
    'light': 'default',
    'primary': 'primary',
    'secondary': 'secondary',
    'primary_text': 'inherit',
    'secondary_text': 'inherit'
};
const useStyles = makeStyles((theme) => ({
    button: {
        '&.lm-button-shaped': {
            borderRadius: '2em'
        },
        '&.lm-button-square': {
            borderRadius: '0'
        },
        '&.lm-button-xlarge': {
            fontSize: '20px',
            '& .MuiIcon-root': {
                fontSize: '1.8rem'
            },
            '&.MuiFab-root': {
                height: '64px',
                minHeight: '64px',
                '&:not(.MuiFab-extended)': {
                    width: '64px'
                }
            },
            '&.MuiFab-extended': {
                paddingLeft: '1.8rem',
                paddingRight: '1.8rem',
                borderRadius: '31px'
            }
        },
        '&.lm-outlined': {
            '&.MuiIconButton-root': {
                border: `1px solid rgba(0,0,0,0.23)`
            },
            '&.MuiIconButton-colorSecondary': {
                border: `1px solid ${theme.palette.secondary.main}`
            },
            '&.MuiIconButton-colorPrimary': {
                border: `1px solid ${theme.palette.primary.main}`
            }
        },
        '&.lm-unelevated': {
            boxShadow: 'none'
        }
    }
}));
const LmMuiButton = ({ content }) => {
    var _a, _b, _c, _d, _e, _f;
    const classes = useStyles();
    const properties = content.properties || [];
    const disableRipple = !!properties.find(i => i === 'disable-ripple');
    const isUnelevated = properties.find(i => i === 'disable-shadow') || content.variant === 'unelevated';
    const color = content.color ? mapColor[content.color] : undefined;
    const className = clsx(classes.button, content.class_names && content.class_names.values, {
        'lm-default-color': !content.color,
        [content.corners]: !!content.corners,
        'lm-unelevated': isUnelevated,
        'lm-outlined': content.variant === 'outlined',
        [content.size]: !!content.size,
        [`lm-font-${content.font}`]: content.font
    });
    if (content.variant === 'fab') {
        return (React.createElement(ContentLink, { content: content, className: 'lm-link__button', passHref: true },
            React.createElement(Fab, { variant: content.label ? 'extended' : undefined, className: className, style: {
                    backgroundColor: ((_a = content.custom_color) === null || _a === void 0 ? void 0 : _a.rgba) ? content.custom_color.rgba : undefined
                }, size: mapSize[content.size] || 'medium', color: color, disableRipple: disableRipple },
                React.createElement(LmIcon, { iconName: content.icon && content.icon.name, buttonSize: content.size }),
                content.image && (React.createElement(LmMuiAvatar, { src: content.image, size: mapAvatarSize[content.size] })),
                content.label,
                React.createElement(LmIcon, { iconName: content.trailing_icon && content.trailing_icon.name, buttonSize: content.size }))));
    }
    if (!content.label) {
        return (React.createElement(ContentLink, { content: content, className: 'lm-link__button', passHref: true },
            React.createElement(IconButton, { color: color, size: mapIconButtonSize[content.size] || 'medium', disableRipple: disableRipple, style: {
                    color: ((_b = content.custom_color) === null || _b === void 0 ? void 0 : _b.rgba) ? content.custom_color.rgba : undefined,
                    borderColor: content.variant === 'outlined' && ((_c = content.custom_color) === null || _c === void 0 ? void 0 : _c.rgba) ? content.custom_color.rgba : undefined
                }, className: className },
                React.createElement(LmIcon, { iconName: content.icon && content.icon.name, buttonSize: content.size }),
                content.image && (React.createElement(LmMuiAvatar, { src: content.image, size: mapAvatarSize[content.size] })))));
    }
    return (React.createElement(ContentLink, { content: content, className: 'lm-link__button', passHref: true },
        React.createElement(Button, { size: mapSize[content.size], className: className, variant: mapVariant[content.variant], disabled: disableRipple, color: color, style: {
                color: !['raised', 'unelevated'].includes(content.variant || '') && ((_d = content.custom_color) === null || _d === void 0 ? void 0 : _d.rgba) ? content.custom_color.rgba : undefined,
                backgroundColor: ['raised', 'unelevated'].includes(content.variant || '') && ((_e = content.custom_color) === null || _e === void 0 ? void 0 : _e.rgba) ? content.custom_color.rgba : undefined,
                borderColor: content.variant === 'outlined' && ((_f = content.custom_color) === null || _f === void 0 ? void 0 : _f.rgba) ? content.custom_color.rgba : undefined
            }, startIcon: React.createElement(LmIcon, { iconName: content.icon && content.icon.name, buttonSize: content.size }), endIcon: React.createElement(LmIcon, { iconName: content.trailing_icon && content.trailing_icon.name, buttonSize: content.size }) },
            content.image && (React.createElement(LmMuiAvatar, { src: content.image, size: mapAvatarSize[content.size] })),
            content.label)));
};
export default LmMuiButton;
