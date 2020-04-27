import React, { createContext, FunctionComponent, useContext } from 'react'
import { AppApiRequestPayload } from '../../typings/app'

export type AppContextProps = Omit<AppApiRequestPayload, 'locale' | 'settings' | 'page' | 'allStories'>

const defaultValue: AppContextProps = {
  allCategories: [],
  allStaticContent: [],
  listWidgetData: {}
}
const AppContext = createContext<AppContextProps>(defaultValue)

const AppProvider: FunctionComponent<{ content: AppContextProps }> = ({ children, content }) => {
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<AppContextProps>(AppContext)

export default AppProvider
