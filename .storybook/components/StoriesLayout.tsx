import WindowDimensionsProvider from '../../src/components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../../src/utils/state/state'
import * as React from 'react'
import { FunctionComponent } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalTheme from '../../src/components/global-theme/GlobalTheme'
import { GlobalStoryblok } from '../../src/typings/generated/components-schema'
import { boolean, color, number, optionsKnob, select, text } from '@storybook/addon-knobs'
import { CONFIG_STORYBOOK } from './configStorybook'
import useGlobalStyles from '../../src/utils/useGlobalStyles'

const Layout: FunctionComponent<{}> = ({ children }) => {
  useGlobalStyles()
  return (
    <>{children}</>
  )
}

const StoriesLayout = (storyFunc: Function) => {
  const isDark = boolean('Dark mode', false, CONFIG_STORYBOOK.KNOBS.THEME)

  const toolbarConfig = optionsKnob('Toolbar Config', {
    'fixed': 'fixed',
    'text bold': 'text_bold',
    'fixed width': 'fixed_width',
    'unelevated': 'unelevated',
    'scroll collapse': 'scroll_collapse',
    'enable system bar': 'enable_system_bar'
  }, ['fixed'], { display: 'inline-check' }, CONFIG_STORYBOOK.KNOBS.TOOLBAR)
  const settings: Partial<GlobalStoryblok> = {
    _uid: new Date().toISOString(),
    component: 'global',
    theme_base: isDark ? 'dark' : 'base',
    theme_primary: color('Theme primary color', '#4db6ac', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_primary_contrast: color('Theme primary contrast', '#fff', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_secondary: color('Theme secondary color', '#37474F', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_secondary_contrast: color('Theme secondary contrast', '', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_error: color('Theme error color', '#37474F', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_error_contrast: color('Theme error contrast', '', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_font_default: text('Theme default font', 'Nunito:300,400,700', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_font_alt1: text('Theme alternative font 1', 'Martel+Sans:700', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_font_alt2: text('Theme alternative font 2', '', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_font_alt3: text('Theme alternative font 3', '', CONFIG_STORYBOOK.KNOBS.THEME),
    theme_font_alt4: text('Theme alternative font 4', '', CONFIG_STORYBOOK.KNOBS.THEME),
    toolbar_config: toolbarConfig as unknown as GlobalStoryblok['toolbar_config'],
    toolbar_main_height: number('Custom Toolbar Height', 56, {}, CONFIG_STORYBOOK.KNOBS.TOOLBAR),
    toolbar_color: { rgba: color('Toolbar Color', '', CONFIG_STORYBOOK.KNOBS.TOOLBAR) } as GlobalStoryblok['toolbar_color'],
    toolbar_variant: select('Toolbar Variant', {
      'unset': '',
      primary: 'primary',
      secondary: 'secondary',
      dark: 'dark',
      white: 'white'
    }, 'secondary', CONFIG_STORYBOOK.KNOBS.TOOLBAR) as GlobalStoryblok['toolbar_variant'],
    toolbar_font_size: text('Toolbar Font Size', '', CONFIG_STORYBOOK.KNOBS.TOOLBAR),
    website_logo: text('Logo URL', 'https://a.storyblok.com/f/69529/1076x500/aeb2c104c2/etherhill_logo_white_001.png', CONFIG_STORYBOOK.KNOBS.TOOLBAR)
  }

  return (
    <GlobalStateProvider>
      <WindowDimensionsProvider>
        <GlobalTheme settings={settings}>
          <div>
            <CssBaseline />
            <Layout>
              <Container component="main" maxWidth={false} style={{ padding: '0px' }}>
                <>
                  {storyFunc({ settings })}
                </>
              </Container>
            </Layout>
          </div>
        </GlobalTheme>
      </WindowDimensionsProvider>
    </GlobalStateProvider>
  )
}

export default StoriesLayout
