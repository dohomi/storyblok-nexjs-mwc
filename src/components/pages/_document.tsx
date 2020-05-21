import Document from 'next/document'
import React from 'react'
import { documentGetInitialProps, LmCoreDocument } from './CoreDocument'

// for demo purpose only. we can't export class directly due to es5 error
export default class MyDoc extends Document {
  render() {
    return <LmCoreDocument props={this.props.__NEXT_DATA__.props} isDevelopment={this.props.isDevelopment} />
  }
}
MyDoc.getInitialProps = documentGetInitialProps
