import WindowDimensionsProvider from '../../src/components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../../src/utils/state/state'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import { useEffect } from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { boolean } from '@storybook/addon-knobs'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import DeviceDetectService from '../../src/utils/DeviceDetectService'

const StoriesLayout = (storyFunc: Function) => {
  const isDark = boolean('Dark mode', false)
  const globalTheme: ThemeOptions = {
    palette: {
      type: isDark ? 'dark' : 'light'
    }
  }
  useEffect(
    () => {
      DeviceDetectService.setAppServices()
    },
    []
  )


  return (
    <WindowDimensionsProvider>
      <GlobalStateProvider>
        <ThemeProvider theme={createMuiTheme(globalTheme)}>
          <CssBaseline />
          <Container component="main" maxWidth={false} style={{ padding: '0px' }}>
            {storyFunc()}
          </Container>
        </ThemeProvider>
      </GlobalStateProvider>
    </WindowDimensionsProvider>
  )
}

export default StoriesLayout
