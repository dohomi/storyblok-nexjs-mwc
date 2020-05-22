import React, { createContext, FunctionComponent, useContext } from 'react'
import { AppApiRequestPayload } from '../../typings/app'

export type AppContextProps = Omit<AppApiRequestPayload, 'locale' | 'settings' | 'page' | 'allStories'> & {
  insideStoryblok?: boolean
  [k: string]: any
}

const defaultValue: AppContextProps = {
  allCategories: [],
  allStaticContent: [],
  listWidgetData: {},
  insideStoryblok: false
}
const AppContext = createContext<AppContextProps>(defaultValue)

const AppProvider: FunctionComponent<{ content: AppContextProps }> = ({ children, content }) => {
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<AppContextProps>(AppContext)

export default AppProvider
