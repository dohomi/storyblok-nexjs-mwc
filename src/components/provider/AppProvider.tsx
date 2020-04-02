import React, { createContext, FunctionComponent, useContext } from 'react'
import { CategoryStoryblok } from '../../typings/generated/components-schema'
import { PageItem, StaticcontainerItem } from '../../typings/generated/schema'

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
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
