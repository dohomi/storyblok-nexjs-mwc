import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import Menu from '../../menu/NavMenu'
import ToolbarLogo from './ToolbarLogo'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  NavMenuStoryblok,
  ToolbarLogoStoryblok,
  ToolbarNaviButtonStoryblok,
  ToolbarRowSectionStoryblok
} from '../../../typings/generated/components-schema'
import LmMuiButton from '../../button/LmMuiButton'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import ListSearchAutocomplete from '../../list-widget/ListSearchAutocomplete'
import ToggleDrawerButton from './ToggleDrawerButton'


type ToolbarSectionComponents = {
  button: FunctionComponent<{ content: ButtonStoryblok }>
  nav_menu: FunctionComponent<{ content: NavMenuStoryblok, settings: GlobalStoryblok }>
  toolbar_logo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }>
  toolbar_navi_button: FunctionComponent<{ content: ToolbarNaviButtonStoryblok, settings: GlobalStoryblok }>
  toolbar_right_navi_button: FunctionComponent<{ content: ToolbarNaviButtonStoryblok, settings: GlobalStoryblok }>
  [k: string]: any
}

const ToolbarComponents: ToolbarSectionComponents = {
  'button': LmMuiButton,
  'nav_menu': Menu,
  'toolbar_logo': ToolbarLogo,
  'toolbar_navi_button': ToggleDrawerButton,
  'toolbar_right_navi_button': ToggleDrawerButton,
  'list_search_autocomplete': ListSearchAutocomplete
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
  const align = content.align
  return (
    <SbEditable content={content}>
      <Grid item
            className={clsx(content.class_names?.values, {
              'h-100': !align,
              'd-inline-flex': !content.align
            })}
            style={{
              alignItems: !align ? 'center' : undefined,
              alignSelf: align ? align : 'center'
            }}
      >
        {body.map(blok => Child(blok, settings))}
      </Grid>
    </SbEditable>
  )
}

export default ToolbarSection
