import { addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StoriesLayout from './components/StoriesLayout'
import './mockNextRouter'

addDecorator(withKnobs)
addDecorator(StoriesLayout)
