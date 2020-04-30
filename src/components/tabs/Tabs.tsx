import * as React from 'react'
import { FunctionComponent, useState } from 'react'
import { TabsItemStoryblok, TabsStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import SwipeableViews from 'react-swipeable-views'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions'
import LmIcon from '../icon/LmIcon'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  tabContainer: {
    '& .react-swipeable-view-container > div > div': {
      padding: theme.spacing(3)
    }
  },
  vertical: {
    '& .MuiTabs-flexContainerVertical': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}))

const Tabs: FunctionComponent<{ content: TabsStoryblok }> = ({ content }) => {
  const { isMobile } = useDeviceDimensions()
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(0)
  const body = content.body || []
  const orientation = content.vertical_tabs && !isMobile ? 'vertical' : 'horizontal'
  const isVertical = orientation === 'vertical'

  const Panel = (
    <SwipeableViews index={activeTab}
                    // @ts-ignore
                    action={(hooks: any) => {
                      setTimeout(() => {
                        typeof hooks.updateHeight === 'function' && hooks.updateHeight()
                      }, 200)
                    }}
                    onChangeIndex={(i) => setActiveTab(i)}
                    className={'lm-slide-content'}
                    animateHeight={content.dynamic_height || isVertical || false}
                    axis={isVertical ? 'y' : 'x'}>
      {body.map((tab: TabsItemStoryblok) => (
        <div key={`content_${tab._uid}`}>
          {tab.body && tab.body.map((blok) => Components(blok))}
        </div>
      ))}
    </SwipeableViews>
  )
  const Tabs = (
    <MuiTabs
      aria-label="tabs"
      value={activeTab}
      centered={!!content.centered}
      variant={content.variant || 'fullWidth'}
      orientation={orientation}
      onChange={(_, value: number) => setActiveTab(value)}
    >
      {body.map((tab: TabsItemStoryblok, iteration) => <Tab label={tab.title}
                                                            wrapped={!!content.wrapped}
                                                            icon={tab.icon && tab.icon.name &&
                                                            <LmIcon style={{ fontSize: 24 }}
                                                                    className={'MuiIcon-root'}
                                                                    iconName={tab.icon.name} />}
                                                            aria-controls={`tabpanel-${iteration}`}
                                                            key={tab._uid} />)}
    </MuiTabs>
  )
  return (
    <Grid container wrap={'wrap'} className={clsx(classes.tabContainer, {
      [classes.vertical]: isVertical
    })}>
      <Grid item xs={12} sm={isVertical ? 'auto' : 12}>
        {Tabs}
      </Grid>
      <Grid item xs={12} sm={isVertical ? true : 12}>
        {Panel}
      </Grid>
    </Grid>
  )
}

export default Tabs
