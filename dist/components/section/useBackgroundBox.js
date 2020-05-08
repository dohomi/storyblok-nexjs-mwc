import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import useShadowStyles from '../jss/shadowStyles';
export default function useBackgroundBox(props) {
    var _a;
    let { background, variant } = props;
    const theme = useTheme();
    const styles = useShadowStyles();
    if (!background && !variant) {
        return {};
    }
    const mapBgColor = {
        dark: '#303030',
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        light: '#fafafa'
    };
    const mapColor = {
        light: 'rgba(0, 0, 0, 0.87)',
        dark_text: 'rgba(0, 0, 0, 0.87)',
        dark: theme.palette.common.white,
        light_text: theme.palette.common.white,
        primary: theme.palette.common.white,
        secondary: theme.palette.common.white
    };
    background = background || {};
    let border = undefined;
    if (background.border_color && background.border_color.rgba) {
        border = `${background.border_size || 1}px ${background.border_style || 'solid'} ${background.border_color && background.border_color.rgba}`;
    }
    else if (background.border_radius) {
        border = '1px solid transparent';
    }
    const style = {
        backgroundColor: (background.background_color && background.background_color.rgba) || mapBgColor[variant],
        border,
        borderRadius: background.border_radius,
        color: mapColor[variant],
        boxShadow: background.elevation ? theme.shadows[background.elevation] : undefined,
        minHeight: background.height ? background.height : undefined
    };
    Object.keys(style).forEach((key) => !style[key] && delete style[key]);
    const className = clsx((_a = background.classNames) === null || _a === void 0 ? void 0 : _a.values, {
        [styles[background.shadow_effect || '']]: !!background.shadow_effect
    });
    return { className, style };
}
