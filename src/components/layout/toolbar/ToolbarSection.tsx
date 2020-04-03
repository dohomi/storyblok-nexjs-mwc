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
import { useTheme } from '@material-ui/core/styles'
import { useAppSetup } from '../../provider/AppSetupProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery'


type ToolbarSectionComponents = {
  button: FunctionComponent<{ content: ButtonStoryblok }>
  nav_menu: FunctionComponent<{ content: NavMenuStoryblok, settings: GlobalStoryblok }>
  toolbar_logo: FunctionComponent<{ content?: ToolbarLogoStoryblok, settings: GlobalStoryblok }>
  toolbar_navi_button: FunctionComponent<{ content: ToolbarNaviButtonStoryblok, settings: GlobalStoryblok }>
  [k: string]: any
}

const ToolbarComponents: ToolbarSectionComponents = {
  'button': LmMuiButton,
  'nav_menu': Menu,
  'toolbar_logo': ToolbarLogo,
  'toolbar_navi_button': ToggleDrawerButton,
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

const ToolbarSectionWrap: FunctionComponent<{ content: ToolbarRowSectionStoryblok }> = ({ children, content }) => {
  const align = content.align
  const theme = useTheme()
  const appSetup = useAppSetup()
  const matches = useMediaQuery(theme.breakpoints.up(appSetup.leftDrawerMediaBreakpoint || 'sm'))

  return (
    <SbEditable content={content}>
      <Grid item
            className={clsx(content.class_names?.values, {
              'h-100': !align,
              'd-inline-flex': !content.align,
              'd-none': content.use_media_query && !matches
            })}
            style={{
              alignItems: !align ? 'center' : undefined,
              alignSelf: align ? align : 'center'
            }}
      >{children}
      </Grid>
    </SbEditable>
  )
}

const ToolbarSection: FunctionComponent<{ content: ToolbarRowSectionStoryblok, settings: GlobalStoryblok }> = ({ settings, content }) => {
  const body = content.body || []
  return (
    <ToolbarSectionWrap content={content}>
      {body.map(blok => Child(blok, settings))}
    </ToolbarSectionWrap>
  )
}

export default ToolbarSection
