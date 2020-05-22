import Document from 'next/document'
import React from 'react'
import { documentGetInitialProps, LmCoreDocument } from './CoreDocument'

// only works if a transpiled version is being used
export class LmDefaultDocument extends Document {
  render() {
    return <LmCoreDocument props={this.props.__NEXT_DATA__.props} isDevelopment={this.props.isDevelopment} />
  }
}

LmDefaultDocument.getInitialProps = documentGetInitialProps
