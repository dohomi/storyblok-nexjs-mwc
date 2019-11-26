import { storiesOf } from '@storybook/react'
import Page from './Page'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  ListSearchAutocompleteStoryblok,
  NavMenuItemStoryblok,
  NavMenuStoryblok,
  PageStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../typings/generated/components-schema'
import { darkSectionWithColumns, get3ColumnsSection } from '../../../.storybook/dummy/section'
import * as React from 'react'
import { toggleRightNavigation } from '../../utils/state/actions'
import { simpleSettings } from '../../../.storybook/dummy/toolbar'
import Layout from '../layout/Layout'
import {
  storyListSearchAutocomplete,
  storyToolbarLogo,
  storyToolbarRow,
  storyToolbarSection
} from '../../../.storybook/dummy/layout/toolbar'
import { boolean } from '@storybook/addon-knobs'
import {
  storyButton,
  storyHeadline,
  storyMenu,
  storyMenuItem,
  storyParagraph
} from '../../../.storybook/dummy/core/various'


const props: PageStoryblok = {
  _uid: '123',
  component: 'page',
  body: [get3ColumnsSection('Body Section 1')]
}

const getPropsDrawer = (): PageStoryblok => ({
  _uid: '123',
  component: 'page',
  body: [get3ColumnsSection('Body Section 1'), get3ColumnsSection('Body Section 1')],
  right_body: [
    storyHeadline({ count: 1, knob: 'Right Drawer' }),
    storyHeadline({ count: 2, knob: 'Right Drawer' }),
    storyParagraph({ knob: 'Right Drawer' })]
})

const getToolbarSettings = () => {
  const menuItem: NavMenuStoryblok = {
    ...storyMenu(),
    body: [storyMenuItem({ count: 1 }), storyMenuItem({ count: 2 }), storyMenuItem({ count: 3 }), storyMenuItem({ count: 4 })] as NavMenuItemStoryblok[]
  }
  const toolbarItems = [
    storyButton({ count: 1 }),
    storyButton({ count: 2 }),
    menuItem] as (ListSearchAutocompleteStoryblok | ButtonStoryblok | NavMenuStoryblok)[]
  const multiToolbarWithSystemBar = [{
    ...storyToolbarRow({
      options: { is_system_bar: true, background_color: { rgba: 'rgba(0,0,0,0.3)' } },
      knob: 'System Bar'
    }),
    body: [{
      ...storyToolbarSection({ knob: 'System Bar Section' }),
      body: [
        storyButton({ count: 1, knob: 'System Bar Buttons' }),
        storyButton({ count: 2, knob: 'System Bar Buttons' }),
        storyButton({ count: 3, knob: 'System Bar Buttons' }),
        {
          ...storyMenu({ knob: 'System Bar Menu' }),
          body: [
            storyMenuItem({ count: 1, knob: 'System Bar Menu' }),
            storyMenuItem({ count: 2, knob: 'System Bar Menu' }),
            storyMenuItem({ count: 3, knob: 'System Bar Menu' })
          ]
        }
      ]
    }] as ToolbarRowSectionStoryblok[]
  }, {
    ...storyToolbarRow(),
    body: [{
      ...storyToolbarSection({ count: 1 }),
      body: [
        storyToolbarLogo()
      ]
    }, {
      ...storyToolbarSection({ count: 2 }),
      body: [
        ...toolbarItems,
        storyListSearchAutocomplete()
      ]
    }] as ToolbarRowSectionStoryblok[]
  }] as ToolbarRowStoryblok []

  return multiToolbarWithSystemBar
}

storiesOf('Layout', module)
  .add(
    'Simple Page',
    () => (
      <Page content={props} />
    )
  )
  .add(
    'Page with drawer',
    () => (
      <>
        <button onClick={() => toggleRightNavigation()}>
          open if mobile
        </button>
        <Page content={getPropsDrawer()} />
      </>
    )
  )
  .add(
    'Playground',
    // @ts-ignore
    ({ settings }: { settings: GlobalStoryblok }) => {


      const show = boolean('Show System Bar', true, 'System Bar')
      const customSettingsSystemBar: GlobalStoryblok = {
        ...simpleSettings,
        multi_toolbar: getToolbarSettings(),
        footer: [darkSectionWithColumns]
      }
      if (!show) {
        customSettingsSystemBar.multi_toolbar && customSettingsSystemBar.multi_toolbar.shift()
      }
      return (
        <>
          <Layout settings={{
            ...settings,
            multi_toolbar: customSettingsSystemBar.multi_toolbar,
            footer: customSettingsSystemBar.footer

          }}
                  hasFeature={false}
                  hasRightDrawer={true}>
            <Page content={getPropsDrawer()} />
          </Layout>
        </>
      )
    }
  )

