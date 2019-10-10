import * as React from 'react'
import { addDecorator, configure } from '@storybook/react'
import WindowDimensionsProvider from '../src/components/provider/WindowDimensionsProvider'

import '!style-loader!css-loader!sass-loader!../src/assets/scss/Layout.scss'
import { GlobalStateProvider } from '../src/utils/state/state'

addDecorator(storyFunc => (
  <WindowDimensionsProvider>
    <GlobalStateProvider>
      {storyFunc()}
    </GlobalStateProvider>
  </WindowDimensionsProvider>
))

const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
