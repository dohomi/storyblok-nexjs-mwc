import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StoriesLayout from './components/StoriesLayout'

addDecorator(withKnobs)
addDecorator(StoriesLayout)
