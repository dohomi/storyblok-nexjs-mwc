import SbEditable from 'storyblok-react'
import {TopAppBarSection} from '@rmwc/top-app-bar'
import React from 'react'
import LmButton from '../../Button'
import Menu from '../../Menu'

const NaviButton = (props) => {
  return (
    <SbEditable content={props}>
      <div style={{color: 'green'}}>navi button</div>
    </SbEditable>
  )
}


const Logo = (props) => {
  return (
    <SbEditable content={props}>
      <div style={{color: 'green'}}>LOGO</div>
    </SbEditable>
  )
}

const Components = {
  'button': LmButton,
  'nav_menu': Menu,
  'toolbar_logo': Logo,
  'toolbar_left_navi_button': NaviButton,
  'toolbar_right_navi_button': NaviButton
}


const Child = (blok) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], {key: blok._uid, content: blok})
  }
  return React.createElement(() => (
    <div style={{color: 'red'}}>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const ToolbarSection = (props) => {
  const body = props.body || []
  return (
    <SbEditable content={props}>
      <TopAppBarSection>
        {body.map(blok => Child(blok))}
      </TopAppBarSection>
    </SbEditable>
  )
}

export default ToolbarSection
