import { storiesOf } from '@storybook/react'
import Page from './Page'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  HeadlineStoryblok,
  ListSearchAutocompleteStoryblok,
  NavMenuItemStoryblok,
  NavMenuStoryblok,
  PageStoryblok,
  ParagraphStoryblok,
  RowStoryblok,
  SectionStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../typings/generated/components-schema'
import { columns, darkSectionWithColumns } from '../../../.storybook/dummy/section'
import * as React from 'react'
import { toggleRightNavigation } from '../../utils/state/actions'
import { customSettingsSystemBar, simpleSettings } from '../../../.storybook/dummy/toolbar'
import Layout from '../layout/Layout'
import {
  listSearchAutocomplete,
  toolbarLogo,
  toolbarRow,
  toolbarSection
} from '../../../.storybook/dummy/layout/toolbar'
import { button } from '@storybook/addon-knobs'
import { storyButton, storyMenu } from '../../../.storybook/dummy/core/various'


const columnSection: SectionStoryblok = {
  _uid: '2234234',
  component: 'section',
  body: [{
    body: columns,
    _uid: '34241231',
    component: 'row'
  }] as RowStoryblok[]
}

const props: PageStoryblok = {
  _uid: '123',
  component: 'page',
  body: [columnSection]
}

const propsDrawer: PageStoryblok = {
  _uid: '123',
  component: 'page',
  body: [columnSection, { ...columnSection, _uid: '12321311' }],
  right_body: [{
    component: 'headline',
    _uid: '12312414',
    text: 'Headline Right'
  }, {
    component: 'paragraph',
    _uid: 'lfkfkf',
    text: 'Some additional content'
  }] as (HeadlineStoryblok | ParagraphStoryblok)[]
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
        <Page content={propsDrawer} />
      </>
    )
  )
  .add(
    'Playground',
    // @ts-ignore
    ({ settings }: { settings: GlobalStoryblok }) => {
      const menuItem: NavMenuStoryblok = {
        ...storyMenu({}),
        body: [{
          _uid: '3243',
          component: 'nav_menu_item',
          label: 'First'
        }, {
          _uid: '34234242',
          component: 'nav_menu_item',
          label: 'Second'
        }] as NavMenuItemStoryblok[]
      }
      const toolbarItems = [
        storyButton({ count: 1 }),
        storyButton({ count: 2 }),
        menuItem] as (ListSearchAutocompleteStoryblok | ButtonStoryblok | NavMenuStoryblok)[]
      const multiToolbarWithSystemBar = [{
        ...toolbarRow({
          options: { is_system_bar: true, background_color: { rgba: 'rgba(0,0,0,0.3)' } },
          knob: 'System Bar'
        }),
        body: [{
          ...toolbarSection({ knob: 'System Bar Section' }),
          body: [
            ...toolbarItems
          ]
        }] as ToolbarRowSectionStoryblok[]
      }, {
        ...toolbarRow({}),
        body: [{
          ...toolbarSection({ count: 1 }),
          body: [
            toolbarLogo()
          ]
        }, {
          ...toolbarSection({ count: 2 }),
          body: [
            ...toolbarItems,
            listSearchAutocomplete()
          ]
        }] as ToolbarRowSectionStoryblok[]
      }] as ToolbarRowStoryblok []

      const customSettingsSystemBar: GlobalStoryblok = {
        ...simpleSettings,
        multi_toolbar: multiToolbarWithSystemBar,
        footer: [darkSectionWithColumns]
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
            <Page content={propsDrawer} />
          </Layout>
        </>
      )
    }
  )
  .add(
    'Playground System Bar',
    // @ts-ignore
    ({ settings }: { settings: GlobalStoryblok }) => {
      return (
        <>
          <Layout settings={{
            ...settings,
            multi_toolbar: customSettingsSystemBar.multi_toolbar,
            footer: customSettingsSystemBar.footer

          }}
                  hasFeature={false}
                  hasRightDrawer={true}>
            <Page content={propsDrawer} />
          </Layout>
        </>
      )
    }
  )
