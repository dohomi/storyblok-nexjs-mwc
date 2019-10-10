import SbEditable from 'storyblok-react'
import { TopAppBarNavigationIcon, TopAppBarSection } from '@rmwc/top-app-bar'
import React, { FunctionComponent } from 'react'
import LmButton from '../../button/Button'
import Menu from '../../menu/Menu'
import { toggleLeftNavigation } from '../../../utils/state/actions'
import ToolbarLogo from './ToolbarLogo'
import ToolbarSearch from './ToolbarSearch'
import clsx from 'clsx'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  NavMenuStoryblok,
  ToolbarLogoStoryblok,
  ToolbarNaviButtonStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarSearchStoryblok
} from '../../../typings/generated/components-schema'

const NaviButton: FunctionComponent<{ content: ToolbarNaviButtonStoryblok, settings: GlobalStoryblok }> = ({ content, settings }) => {
  const mobileNavBreakpoint = settings.mobile_nav_breakpoint || 'sm'
  const iconName = content.icon && content.icon.name || 'menu'
  return (
    <SbEditable content={content}>
      <TopAppBarNavigationIcon icon={iconName}
                               className={`d-${mobileNavBreakpoint}-none`}
                               onClick={toggleLeftNavigation} />
    </SbEditable>
  )
}

type ToolbarSectionComponents = {
  button: FunctionComponent<{ content: ButtonStoryblok }>
  nav_menu: FunctionComponent<{ content: NavMenuStoryblok, settings: GlobalStoryblok }>
  toolbar_logo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }>
  toolbar_navi_button: FunctionComponent<{ content: ToolbarNaviButtonStoryblok, settings: GlobalStoryblok }>
  toolbar_right_navi_button: FunctionComponent<{ content: ToolbarNaviButtonStoryblok, settings: GlobalStoryblok }>
  toolbar_search: FunctionComponent<{ content: ToolbarSearchStoryblok }>
  [k: string]: any
}

const ToolbarComponents: ToolbarSectionComponents = {
  'button': LmButton,
  'nav_menu': Menu,
  'toolbar_logo': ToolbarLogo,
  'toolbar_navi_button': NaviButton,
  'toolbar_right_navi_button': NaviButton,
  'toolbar_search': ToolbarSearch
}

const Child = (blok: any, settings: GlobalStoryblok) => {
  if (typeof ToolbarComponents[blok.component] !== 'undefined') {
    return React.createElement(ToolbarComponents[blok.component], { key: blok._uid, content: blok, settings })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}

const ToolbarSection: FunctionComponent<{ content: ToolbarRowSectionStoryblok, settings: GlobalStoryblok }> = ({ settings, content }) => {
  const body = content.body || []
  const className = clsx(content.class_names && content.class_names.values)
  return (
    <SbEditable content={content}>
      <TopAppBarSection alignEnd={content.align_end} className={className}>
        {body.map(blok => Child(blok, settings))}
      </TopAppBarSection>
    </SbEditable>
  )
}

export default ToolbarSection
