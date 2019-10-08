import * as React from 'react'
import { addDecorator, configure } from '@storybook/react'
import WindowDimensionsProvider from '../src/components/provider/WindowDimensionsProvider'

import '../src/assets/scss/Layout.scss'

addDecorator(storyFunc => (
  <WindowDimensionsProvider>{storyFunc()}</WindowDimensionsProvider>
))

const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
