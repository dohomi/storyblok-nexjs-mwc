import { addDecorator, configure } from '@storybook/react'
import '!style-loader!css-loader!sass-loader!../src/assets/scss/app_styles.scss'
import { withKnobs } from '@storybook/addon-knobs'
import StoriesLayout from './components/StoriesLayout'


addDecorator(withKnobs)
addDecorator(StoriesLayout)

const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
