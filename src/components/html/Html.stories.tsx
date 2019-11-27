import { storiesOf } from '@storybook/react'
import Html from './Html'
import { storyHtml } from '../../../.storybook/dummy/core/various'

storiesOf('HTML', module)
  .add(
    'HTML',
    () => (
      <>
        <Html content={storyHtml({
          options: {
            body: '<h3>Hello World!</h3>'
          }
        })} />
      </>
    ), {
      knobs: {
        escapeHTML: false
      }
    }
  )
