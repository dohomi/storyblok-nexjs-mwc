import React, { createContext, FunctionComponent, useContext } from 'react'
import { AppApiRequestPayload } from '../../typings/app'

export type AppContextProps = Omit<AppApiRequestPayload, 'locale' | 'settings' | 'page'>

const defaultValue: AppContextProps = {
  allCategories: [],
  allStories: [],
  allStaticContent: []
}
const AppContext = createContext<AppContextProps>(defaultValue)

const AppProvider: FunctionComponent<{ content: AppContextProps }> = ({ children, content }) => {
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<AppContextProps>(AppContext)

export default AppProvider
