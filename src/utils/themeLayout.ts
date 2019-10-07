import parseFont from './parseFont'

const theme = {
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
    hoverLink: '#6200ee',
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
    textIconOnDark: 'rgba(255, 255, 255, 0.5)'
  },
  dark: {
    primary: '#24aee9',
    secondary: '#e539ff',
    error: '#b00020',
    background: '#212121',
    surface: '#fff',//'#37474F'
    dark: 'rgba(0, 0, 0, 0.87)',
    onPrimary: 'rgba(255,255,255,.87)',
    onSecondary: 'rgba(0,0,0,0.87)',
    onSurface: 'rgba(255,255,255,.87)',
    onError: '#fff',
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
    textIconOnDark: 'rgba(255, 255, 255, 0.5)'
  }
}

export function getThemeOptions (settings = {}) {
  const themeOptions = theme[settings.theme_base || 'base']
  settings.theme_primary && (themeOptions.primary = settings.theme_primary)
  settings.theme_secondary && (themeOptions.secondary = settings.theme_secondary)
  settings.theme_link && (themeOptions.link = settings.theme_link)
  settings.theme_link_hover && (themeOptions.linkHover = settings.theme_link_hover)
  // 'theme_font_default', 'theme_font_alt1', 'theme_font_alt2', 'theme_font_alt3', 'theme_font_alt4'
  themeOptions.fontDefault = parseFont(settings.theme_font_default) || 'Nunito'
  themeOptions.fontAlt1 = parseFont(settings.theme_font_alt1) || themeOptions.fontDefault
  themeOptions.fontAlt2 = parseFont(settings.theme_font_alt2) || themeOptions.fontDefault
  themeOptions.fontAlt3 = parseFont(settings.theme_font_alt3) || themeOptions.fontDefault
  themeOptions.fontAlt4 = parseFont(settings.theme_font_alt4) || themeOptions.fontDefault
  return themeOptions
}

