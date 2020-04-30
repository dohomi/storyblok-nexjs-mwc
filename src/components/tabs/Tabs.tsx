import * as React from 'react'
import { FunctionComponent, useState } from 'react'
import { TabsItemStoryblok, TabsStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import SwipeableViews from 'react-swipeable-views'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions'
import LmIcon from '../icon/LmIcon'

const useStyles = makeStyles((theme: Theme) => ({
  tabContainer: {
    '& .react-swipeable-view-container > div > div': {
      padding: theme.spacing(3)
    },
    '&.vertical': {
      flexGrow: 1,
      display: 'flex',
      borderRight: `1px solid ${theme.palette.divider}`,
      '& .lm-slide-content': {
        alignSelf: 'baseline'
      }
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
  return (
    <div className={clsx(classes.tabContainer, {
      'vertical': isVertical
    })}>
      <MuiTabs
        aria-label="tabs"
        value={activeTab}
        centered={!!content.centered}
        variant={content.variant || 'fullWidth'}
        orientation={orientation}
        onChange={(_, value: number) => setActiveTab(value)}
      >
        {body.map((tab: TabsItemStoryblok) => <Tab label={tab.title}
                                                   wrapped={!!content.wrapped}
                                                   icon={tab.icon && tab.icon.name &&
                                                   <LmIcon style={{ fontSize: 24 }} className={'MuiIcon-root'}
                                                           iconName={tab.icon.name} />}
                                                   key={tab._uid} />)}
      </MuiTabs>
      <SwipeableViews index={activeTab}
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
    </div>
  )
}

export default Tabs
