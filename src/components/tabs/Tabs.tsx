// import { Tab, TabBar } from '@rmwc/tabs'
import * as React from 'react'
import { FunctionComponent, useState } from 'react'
import { TabsItemStoryblok, TabsStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import SwipeableViews from 'react-swipeable-views'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Icon from '@material-ui/core/Icon'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'

const useStyles = makeStyles((theme: Theme) => ({
  tabContainer: {
    '& .react-swipeable-view-container > div': {
      padding: theme.spacing(3)
    },
    '&.vertical': {
      flexGrow: 1,
      display: 'flex',
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}))

const Tabs: FunctionComponent<{ content: TabsStoryblok }> = ({ content }) => {
  const { width } = useWindowDimensions()
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(0)
  const body = content.body || []
  const orientation = content.vertical_tabs && width > 768 ? 'vertical' : 'horizontal'
  return (
    <div className={clsx(classes.tabContainer, {
      'vertical': orientation === 'vertical'
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
                                                   wrapped={!!content.stacked_icons}
                                                   icon={tab.icon && tab.icon.name && <Icon>{tab.icon.name}</Icon>}
                                                   key={tab._uid} />)}
      </MuiTabs>
      <SwipeableViews index={activeTab} onChangeIndex={(i) => setActiveTab(i)}>
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
