import * as React from 'react'
import { createContext, FunctionComponent, useContext, useState } from 'react'
import { CategoryStoryblok } from '../../typings/generated/components-schema'
import { PageItem, StaticcontainerItem } from '../../typings/generated/schema'
import StoryblokService from '../../utils/StoryblokService'

export type AppContextProps = {
  allStories: PageItem[],
  allCategories: CategoryStoryblok[]
  allStaticContent: StaticcontainerItem[]
}

const defaultValue: AppContextProps = {
  allStories: [],
  allCategories: [],
  allStaticContent: []
}
const AppContext = createContext(defaultValue)

const AppProvider: FunctionComponent<{ content: AppContextProps }> = ({ children, content }) => {

  const insideVisualComposer = StoryblokService.insideVisualComposer()
  if (insideVisualComposer) {
    return <AppContext.Provider value={content}>{children}</AppContext.Provider>
  }
  const [value] = useState<AppContextProps>(content)
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
