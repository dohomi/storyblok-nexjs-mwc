import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import useShadowStyles from '../jss/shadowStyles';
export default function useBackgroundBox(props) {
    var _a;
    var _b;
    var background = props.background, variant = props.variant;
    var theme = useTheme();
    var styles = useShadowStyles();
    if (!background && !variant) {
        return {};
    }
    var mapBgColor = {
        dark: '#303030',
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        light: '#fafafa'
    };
    var mapColor = {
        light: 'rgba(0, 0, 0, 0.87)',
        dark_text: 'rgba(0, 0, 0, 0.87)',
        dark: theme.palette.common.white,
        light_text: theme.palette.common.white,
        primary: theme.palette.common.white,
        secondary: theme.palette.common.white
    };
    background = background || {};
    var border = undefined;
    if (background.border_color && background.border_color.rgba) {
        border = (background.border_size || 1) + "px " + (background.border_style || 'solid') + " " + (background.border_color && background.border_color.rgba);
    }
    else if (background.border_radius) {
        border = '1px solid transparent';
    }
    var style = {
        backgroundColor: (background.background_color && background.background_color.rgba) || mapBgColor[variant],
        border: border,
        borderRadius: background.border_radius,
        color: mapColor[variant],
        boxShadow: background.elevation ? theme.shadows[background.elevation] : undefined,
        minHeight: background.height ? background.height : undefined
    };
    Object.keys(style).forEach(function (key) { return !style[key] && delete style[key]; });
    var className = clsx((_b = background.classNames) === null || _b === void 0 ? void 0 : _b.values, (_a = {},
        _a[styles[background.shadow_effect || '']] = !!background.shadow_effect,
        _a));
    return { className: className, style: style };
}
