import * as React from 'react'
import { createContext, FunctionComponent, useContext } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

const AppContext = createContext({})

const AppProvider: FunctionComponent<{ value: GlobalStoryblok }> = ({ children, value }) => {
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
