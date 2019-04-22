import SbEditable from 'storyblok-react'
import {TopAppBarNavigationIcon, TopAppBarSection, TopAppBarTitle} from '@rmwc/top-app-bar'
import React from 'react'
import LmButton from '../../Button'
import Menu from '../../Menu'
import {toggleLeftNavigation} from '../../../utils/state/state'
import ToolbarLogo from './ToolbarLogo'
import {Button} from '@rmwc/button'
import {IconButton} from '@rmwc/icon-button'
import {TextField} from '@rmwc/textfield'

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

const ToolbarSearch = ({content}) => {
  const container = React.createRef()

  const buttonContent = content.trigger && content.trigger[0] || {}
  const properties = buttonContent.properties || []
  const trailingIcon = buttonContent.trailing_icon && buttonContent.trailing_icon.name
  const icon = buttonContent.icon && buttonContent.icon.name
  const buttonProps = {
    trailingIcon,
    icon,
    label: buttonContent.label,
    ripple: !properties.includes('disable-ripple')
  }

  function openSearch () {
    container.current.classList.add('active')
    container.current.querySelector('.mdc-text-field__input').focus()
  }

  function onCancel () {
    container.current.classList.remove('active')
    container.current.querySelector('.mdc-text-field__input').value = ''
  }

  return (
    <SbEditable content={content}>
      <div ref={container} className="lm-toolbar-search">
        <Button {...buttonProps} onClick={openSearch} className="lm-toolbar-search__button-toggle"/>
        <div className="lm-toolbar-search__input-container">
          <div className="d-flex align-items-center h-100">
            <div style={{flex: 1}}>
              <TextField fullwidth
                         placeholder={'todo...'}
                         icon="search"/>
            </div>
            <IconButton icon="clear"
                        onClick={onCancel}
                        className="lm-toolbar-search__button-clear"/>
          </div>
        </div>
      </div>
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
