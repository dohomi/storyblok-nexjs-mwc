type ToolbarThemeItem = {
  primary: string
  surface: string
  onPrimary: string
  [k: string]: string
}
type ToolbarTheme = {
  white: ToolbarThemeItem
  primary: ToolbarThemeItem
  secondary: ToolbarThemeItem
  dark: ToolbarThemeItem

  [k: string]: any
}

export const toolbar: ToolbarTheme = {
  // @ts-ignore
  white: {
    primary: 'white',
    surface: 'white'
  },

  primary: {
    primary: 'var(--mdc-theme-primary)',
    onPrimary: 'var(--mdc-theme-on-primary)',
    surface: 'white'
  },

  secondary: {
    primary: 'var(--mdc-theme-secondary)',
    onPrimary: 'var(--mdc-theme-on-secondary)',
    surface: 'white'
  },

  dark: {
    primary: 'var(--mdc-theme-dark)',
    onPrimary: 'var(--mdc-theme-on-dark)',
    surface: 'white'
  }
}

export const section = {
  dark: {
    textPrimaryOnBackground: 'white',
    onSurface: 'white',
    background: 'var(--mdc-theme-dark)'
  },
  primary: {
    onSurface: 'white',
    textPrimaryOnBackground: 'white',
    background: 'var(--mdc-theme-primary)'
  },
  secondary: {
    onSurface: 'white',
    textPrimaryOnBackground: 'white',
    background: 'var(--mdc-theme-secondary)'
  },
  light: {
    background: 'whitesmoke',
    textPrimaryOnBackground: 'var(--mdc-theme-dark)',
    onSurface: 'var(--mdc-theme-dark)'
  },
  dark_text: {
    textPrimaryOnBackground: 'var(--mdc-theme-dark)',
    onSurface: 'var(--mdc-theme-dark)'
  },
  light_text: {
    textPrimaryOnBackground: 'white',
    onSurface: 'white'
  },
  transparent: {
    background: 'transparent'
  }
}
