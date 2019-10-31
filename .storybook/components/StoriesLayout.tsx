import WindowDimensionsProvider from '../../src/components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../../src/utils/state/state'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import * as React from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { text } from '@storybook/addon-knobs'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

const StoriesLayout = (storyFunc: Function) => {
  const globalTheme: ThemeOptions = {
    overrides: {
      MuiTypography: {
        root: {
          color: text('GLOBAL: Typography Color', '#ff0000')
        }
      },
      MuiButton: {
        text: {
          color: text('GLOBAL: Button default Color', '#00ff00')
        },
        textPrimary: {
          color: text('GLOBAL: Button primary Color', '#004554')
        }
      }
    }
  }


  return (
    <WindowDimensionsProvider>
      <GlobalStateProvider>
        <ThemeProvider theme={createMuiTheme(globalTheme)}>
          <CssBaseline/>
          <Container component="main" maxWidth={false}>
            {storyFunc()}
          </Container>
        </ThemeProvider>
      </GlobalStateProvider>
    </WindowDimensionsProvider>
  )
}

export default StoriesLayout
