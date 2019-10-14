import { Tab, TabBar } from '@rmwc/tabs'
import { FunctionComponent, useState } from 'react'
import { TabsItemStoryblok, TabsStoryblok } from '../../typings/generated/components-schema'
import Components from 'components'
import SwipeableViews from 'react-swipeable-views'

const Tabs: FunctionComponent<{ content: TabsStoryblok }> = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0)

  const body = content.body || []
  return (
    <>
      <TabBar
        activeTabIndex={activeTab}
        onActivate={evt => setActiveTab(evt.detail.index)}
      >
        {body.map((tab: TabsItemStoryblok) => <Tab label={tab.title}
                                                   restrictIndicator={!!content.restrict_indicator}
                                                   stacked={!!content.stacked_icons}
                                                   icon={tab.icon && tab.icon.name}
                                                   key={tab._uid} />)}
      </TabBar>
      <SwipeableViews index={activeTab} onChangeIndex={(i) => setActiveTab(i)}>
        {body.map((tab: TabsItemStoryblok) => (
          <div key={`content_${tab._uid}`}>
            {tab.body && tab.body.map((blok) => Components(blok))}
          </div>
        ))}
      </SwipeableViews>
    </>
  )
}

export default Tabs
