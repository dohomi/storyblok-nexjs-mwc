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
  .add(
    'IFrame Example Mixcloud',
    () => (
      <>
        <Html content={storyHtml({
          options: {
            lazy_load: true,
            body: '<iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fladyflic%2Felevation-radio-with-lady-flic-8%2F" frameborder="0" ></iframe>'
          }
        })} />
        <div className="p-5"></div>
        <Html content={storyHtml({
          knob: 'Html 2',
          options: {
            lazy_load: true,
            body: '<iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fladyflic%2Flady-flic-at-caf%C3%A9-del-mar-bali%2F" frameborder="0" ></iframe>'
          }
        })} />
      </>
    ), {
      knobs: {
        escapeHTML: false
      }
    }
  )
