import React, { createContext, FunctionComponent, FunctionComponentFactory, useContext } from 'react'
import { AppApiRequestPayload } from '../../typings/app'

export type AppContextProps =
  Omit<AppApiRequestPayload, 'locale' | 'settings' | 'page' | 'allStories'>
  & {
  insideStoryblok?: boolean
  ComponentRender: FunctionComponentFactory<{
    content: any
    i?: number
    [k: string]: any
  }>
  [k: string]: any
}

const defaultValue: AppContextProps = {
  allCategories: [],
  allStaticContent: [],
  listWidgetData: {},
  insideStoryblok: false,
  ComponentRender: (_blok: any) => {
    return (
      <div>needs to be set</div>
    )
  }
}
const AppContext = createContext<AppContextProps>(defaultValue)

const AppProvider: FunctionComponent<{ content: AppContextProps }> = ({ children, content }) => {
  return <AppContext.Provider value={content}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<AppContextProps>(AppContext)

export default AppProvider
