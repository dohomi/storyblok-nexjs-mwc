import SbEditable from 'storyblok-react'
import {TopAppBarNavigationIcon, TopAppBarSection} from '@rmwc/top-app-bar'
import React from 'react'
import LmButton from '../../Button'
import Menu from '../../menu/Menu'
import {toggleLeftNavigation} from '../../../utils/state/state'
import ToolbarLogo from './ToolbarLogo'
import ToolbarSearch from './ToolbarSearch'

const NaviButton = ({content, settings}) => {
  const mobileNavBreakpoint = settings.mobile_nav_breakpoint || 'sm'
  const iconName = content.icon && content.icon.name || 'menu'
  return (
    <SbEditable content={content}>
      <TopAppBarNavigationIcon icon={iconName}
                               className={`d-${mobileNavBreakpoint}-none`}
                               onClick={toggleLeftNavigation}/>
    </SbEditable>
  )
}

const Components = {
  'button': LmButton,
  'nav_menu': Menu,
  'toolbar_logo': ToolbarLogo,
  'toolbar_navi_button': NaviButton,
  'toolbar_right_navi_button': NaviButton,
  'toolbar_search': ToolbarSearch
}


const Child = (blok, settings) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], {key: blok._uid, content: blok, settings})
  }
  return React.createElement(() => (
    <div style={{color: 'red'}}>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const ToolbarSection = (props) => {
  const body = props.body || []
  return (
    <SbEditable content={props}>
      <TopAppBarSection alignEnd={props.align_end}>
        {body.map(blok => Child(blok, props.settings))}
      </TopAppBarSection>
    </SbEditable>
  )
}

export default ToolbarSection
