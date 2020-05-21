import React, { FunctionComponent } from 'react'
import { LmMenu } from '../../menu/NavMenu'
import ToolbarLogo from './ToolbarLogo'
import { GlobalStoryblok, ToolbarRowSectionStoryblok } from '../../../typings/generated/components-schema'
import { LmButton } from '../../button/Button'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { LmListSearchAutocomplete } from '../../list-widget/ListSearchAutocomplete'
import ToggleDrawerButton from './ToggleDrawerButton'
import { useTheme } from '@material-ui/core/styles'
import { useAppSetup } from '../../provider/AppSetupProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { LmHeadline } from '../../headline/Headline'


type ToolbarSectionComponents = {
  [k: string]: any
}

const ToolbarComponents: ToolbarSectionComponents = {
  'button': LmButton,
  'nav_menu': LmMenu,
  'toolbar_logo': ToolbarLogo,
  'toolbar_navi_button': ToggleDrawerButton,
  'list_search_autocomplete': LmListSearchAutocomplete,
  'headline': LmHeadline
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

  const hideOnMediaQuery = content.use_media_query && !matches
  const invHideOnMediaQuery = content.inv_use_media_query && matches
  return (
    <Grid item
          className={clsx(content.class_names?.values, {
            'h-100': !align,
            'd-inline-flex': !content.align && !hideOnMediaQuery && !invHideOnMediaQuery,
            'd-none': hideOnMediaQuery || invHideOnMediaQuery
          })}
          style={{
            alignItems: !align ? 'center' : undefined,
            alignSelf: align ? align : 'center'
          }}
    >{children}
    </Grid>
  )
}

type ToolbarSectionProps = { content: ToolbarRowSectionStoryblok, settings: GlobalStoryblok }

function ToolbarSection({ settings, content }: ToolbarSectionProps): JSX.Element {
  const body = content.body || []
  return (
    <ToolbarSectionWrap content={content}>
      {body.map(blok => Child(blok, settings))}
    </ToolbarSectionWrap>
  )
}

export default ToolbarSection
