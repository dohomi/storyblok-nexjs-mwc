import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { NavListStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import NavListItem from './NavListItem'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles({
  root: {
    '& .MuiTypography-root': {
      display: 'inline-block',
      paddingRight: '12px',
      '&:last-child': {
        paddingRight: '0px'
      }
    },
    '&.lm-nav-list__column .MuiTypography-root': {
      display: 'block'
    }
  }

})

const NavList: FunctionComponent<{ content: NavListStoryblok }> = ({ content }) => {
  const classes = useStyles()
  const dimensions = useWindowDimensions()
  const body = content && content.body || []
  const properties = content.properties || []
  const header = content.header

  if ((dimensions.isMobile && content.collapse_on_mobile) || content.forceCollapse) {
    const metaIcon = content.collapse_icon && content.collapse_icon.name || 'expand_more'
    return (
      <SbEditable content={content}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<Icon>{metaIcon}</Icon>}>
            <Typography>{content.header}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={clsx('lm-nav-list', content.class_names && content.class_names.values, {
              'lm-nav-list__column': properties.find(i => i === 'flex-column')
            }, classes.root)}>
              {body.map((blok) => <NavListItem {...blok} key={blok._uid} />)}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </SbEditable>
    )
  }
  const navClassNames = clsx(content.style)
  return (
    <SbEditable content={content}>
      <div className={clsx('lm-nav-list', content.class_names && content.class_names.values, {
        'lm-nav-list__column': properties.find(i => i === 'flex-column')
      }, classes.root)}>
        {header && <h4>{header}</h4>}
        <nav className={navClassNames}>
          {body.map((blok) => <NavListItem {...blok} key={blok._uid} />)}
        </nav>
      </div>
    </SbEditable>
  )
}

export default memo<{ content: NavListStoryblok }>(NavList)
