import React, { createContext, FunctionComponent, useContext } from 'react'
import { AppApiRequestPayload } from '../../typings/app'

export type AppContextProps = Pick<AppApiRequestPayload, 'allStories' | 'allStaticContent' | 'allCategories'> & {}

const defaultValue: AppContextProps = {
  allStories: [],
  allCategories: [],
  allStaticContent: []
}
const AppContext = createContext<AppContextProps>(defaultValue)

const AppProvider: FunctionComponent<{ content: AppContextProps }> = ({ children, content }) => {
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<AppContextProps>(AppContext)

export default AppProvider
