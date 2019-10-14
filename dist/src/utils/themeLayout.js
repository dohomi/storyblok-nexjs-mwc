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
import parseFont from './parseFont';
var theme = {
    base: {
        primary: '#6200ee',
        secondary: '#03dac4',
        error: '#b00020',
        background: '#fff',
        surface: '#fff',
        dark: 'rgba(0, 0, 0, 0.87)',
        link: '#6200ee',
        onPrimary: 'rgba(255, 255, 255, 1)',
        onSecondary: 'rgba(255, 255, 255, 1)',
        onSurface: 'rgba(0, 0, 0, 0.87)',
        onDark: 'rgba(255, 255, 255, 1)',
        onError: '#fff',
        linkHover: '#6200ee',
        textPrimaryOnBackground: 'rgba(0, 0, 0, 0.87)',
        textSecondaryOnBackground: 'rgba(0, 0, 0, 0.54)',
        textHintOnBackground: 'rgba(0, 0, 0, 0.38)',
        textDisabledOnBackground: 'rgba(0, 0, 0, 0.38)',
        textIconOnBackground: 'rgba(0, 0, 0, 0.38)',
        textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
        textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
        textHintOnLight: 'rgba(0, 0, 0, 0.38)',
        textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
        textIconOnLight: 'rgba(0, 0, 0, 0.38)',
        textPrimaryOnDark: 'white',
        textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
        textHintOnDark: 'rgba(255, 255, 255, 0.5)',
        textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
        textIconOnDark: 'rgba(255, 255, 255, 0.5)',
        fontDefault: 'Nunito'
    },
    dark: {
        primary: '#24aee9',
        secondary: '#e539ff',
        error: '#b00020',
        background: '#212121',
        surface: '#fff',
        dark: 'rgba(0, 0, 0, 0.87)',
        onPrimary: 'rgba(255,255,255,.87)',
        onSecondary: 'rgba(0,0,0,0.87)',
        onSurface: 'rgba(255,255,255,.87)',
        onError: '#fff',
        link: '#6200ee',
        linkHover: '#6200ee',
        onDark: 'rgba(255, 255, 255, 1)',
        textPrimaryOnBackground: 'rgba(255, 255, 255, 1)',
        textSecondaryOnBackground: 'rgba(255, 255, 255, 0.7)',
        textHintOnBackground: 'rgba(255, 255, 255, 0.5)',
        textDisabledOnBackground: 'rgba(255, 255, 255, 0.5)',
        textIconOnBackground: 'rgba(255, 255, 255, 0.5)',
        textPrimaryOnLight: 'rgba(0, 0, 0, 0.87)',
        textSecondaryOnLight: 'rgba(0, 0, 0, 0.54)',
        textHintOnLight: 'rgba(0, 0, 0, 0.38)',
        textDisabledOnLight: 'rgba(0, 0, 0, 0.38)',
        textIconOnLight: 'rgba(0, 0, 0, 0.38)',
        textPrimaryOnDark: 'white',
        textSecondaryOnDark: 'rgba(255, 255, 255, 0.7)',
        textHintOnDark: 'rgba(255, 255, 255, 0.5)',
        textDisabledOnDark: 'rgba(255, 255, 255, 0.5)',
        textIconOnDark: 'rgba(255, 255, 255, 0.5)',
        fontDefault: 'Nunito'
    }
};
export function getThemeOptions(settings) {
    var themeOptions = __assign({}, theme[settings.theme_base || 'base']);
    settings.theme_primary && (themeOptions.primary = settings.theme_primary);
    settings.theme_secondary && (themeOptions.secondary = settings.theme_secondary);
    settings.theme_link && (themeOptions.link = settings.theme_link); // rewrote link => theme_link
    settings.theme_link_hover && (themeOptions.linkHover = settings.theme_link_hover);
    themeOptions.fontDefault = parseFont(settings.theme_font_default) || 'Nunito';
    // @ts-ignore
    themeOptions.fontAlt1 = parseFont(settings.theme_font_alt1) || themeOptions.fontDefault;
    // @ts-ignore
    themeOptions.fontAlt2 = parseFont(settings.theme_font_alt2) || themeOptions.fontDefault;
    // @ts-ignore
    themeOptions.fontAlt3 = parseFont(settings.theme_font_alt3) || themeOptions.fontDefault;
    // @ts-ignore
    themeOptions.fontAlt4 = parseFont(settings.theme_font_alt4) || themeOptions.fontDefault;
    return themeOptions;
}
