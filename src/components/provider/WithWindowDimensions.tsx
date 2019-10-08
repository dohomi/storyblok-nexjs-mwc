import React, { Component, forwardRef, PureComponent, RefObject } from 'react'
import { WindowDimensionsCtx } from './WindowDimensionsProvider'

const withWindowDimensions = (mapDimensionsToProps) => (WrappedComponent) => {
  type PrivateProps = {
    forwardedRef: RefObject<Component>
  }

  class Wrapped extends PureComponent<PrivateProps> {

    static displayName = `withWindowDimensions(${
      WrappedComponent.displayName || WrappedComponent.name
    })`

    render() {
      const { forwardedRef } = this.props
      return (
        <WindowDimensionsCtx.Consumer>
          {dimensions => (
            <WrappedComponent
              {...this.props}
              {...mapDimensionsToProps(dimensions)}
              ref={forwardedRef}
            />
          )}
        </WindowDimensionsCtx.Consumer>
      )
    }
  }

  // @ts-ignore
  return forwardRef((props, ref) => <Wrapped {...props} forwardedRef={ref} />)
}

export default withWindowDimensions
