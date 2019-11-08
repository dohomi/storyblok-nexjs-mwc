import WindowDimensionsProvider from '../../src/components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../../src/utils/state/state'
import * as React from 'react'
import { FunctionComponent } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalTheme from '../../src/components/global-theme/GlobalTheme'
import { GlobalStoryblok } from '../../src/typings/generated/components-schema'
import { boolean, text } from '@storybook/addon-knobs'
import useGlobalStyles from '../../src/utils/useGlobalStyles'

const Layout: FunctionComponent = ({ children }) => {
  useGlobalStyles()
  return (
    <>{children}</>
  )
}

const StoriesLayout = (storyFunc: Function) => {
  const isDark = boolean('Dark mode', false)

  // $primary: #4db6ac;
  // $secondary: #37474F;
  const settings: Partial<GlobalStoryblok> = {
    toolbar_variant: 'dark',
    theme_base: isDark ? 'dark' : 'base',
    theme_primary: text('Theme primary', '#4db6ac'),
    theme_primary_contrast: text('Theme primary contrast', '#fff'),
    theme_secondary: text('Theme secondary', '#37474F'),
    theme_secondary_contrast: text('Theme secondary contrast', ''),
    theme_font_default: text('Theme default font', 'Nunito:300,400,700'),
    theme_font_alt1: text('Theme alternative font 1', 'Martel+Sans:700'),
    theme_font_alt2: text('Theme alternative font 2', ''),
    theme_font_alt3: text('Theme alternative font 3', ''),
    theme_font_alt4: text('Theme alternative font 4', '')
  }
  return (
    <WindowDimensionsProvider>
      <GlobalStateProvider>
        <GlobalTheme settings={settings}>
          <CssBaseline />
          <Layout>
            <Container component="main" maxWidth={false} style={{ padding: '0px' }}>
              {storyFunc()}
            </Container>
          </Layout>
        </GlobalTheme>
      </GlobalStateProvider>
    </WindowDimensionsProvider>
  )
}

export default StoriesLayout
