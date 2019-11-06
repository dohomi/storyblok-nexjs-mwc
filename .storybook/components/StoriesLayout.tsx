import WindowDimensionsProvider from '../../src/components/provider/WindowDimensionsProvider'
import { GlobalStateProvider } from '../../src/utils/state/state'
import * as React from 'react'
import { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import DeviceDetectService from '../../src/utils/DeviceDetectService'
import GlobalTheme from '../../src/components/global-theme/GlobalTheme'

const StoriesLayout = (storyFunc: Function) => {

  useEffect(
    () => {
      DeviceDetectService.setAppServices()
    },
    []
  )

  // $primary: #4db6ac;
  // $secondary: #37474F;
  return (
    <WindowDimensionsProvider>
      <GlobalStateProvider>
        <GlobalTheme settings={{ toolbar_variant: 'dark', theme_primary: '#4db6ac', theme_secondary: '#37474F' }}>
          <CssBaseline />
          <Container component="main" maxWidth={false} style={{ padding: '0px' }}>
            {storyFunc()}
          </Container>
        </GlobalTheme>
      </GlobalStateProvider>
    </WindowDimensionsProvider>
  )
}

export default StoriesLayout
