import WindowDimensionsProvider from '../../src/components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../../src/utils/state/state'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import * as React from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { boolean } from '@storybook/addon-knobs'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

const StoriesLayout = (storyFunc: Function) => {
  const isDark = boolean('Dark mode', false)
  const globalTheme: ThemeOptions = {
    palette: {
      type: isDark ? 'dark' : 'light'
    }
  }


  return (
    <WindowDimensionsProvider>
      <GlobalStateProvider>
        <ThemeProvider theme={createMuiTheme(globalTheme)}>
          <CssBaseline />
          <Container component="main" maxWidth={false}>
            {storyFunc()}
          </Container>
        </ThemeProvider>
      </GlobalStateProvider>
    </WindowDimensionsProvider>
  )
}

export default StoriesLayout
