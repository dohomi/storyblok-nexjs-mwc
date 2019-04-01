import React from 'react'
import Head from 'next-server/head'

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  500: 'Internal Server Error',
  501: 'Not Implemented'
}

export default class Error extends React.Component {
  static displayName = 'ErrorPage'

  static getInitialProps ({res, err}) {
    const statusCode =
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
    return {statusCode}
  }

  render () {
    const {statusCode} = this.props
    const title = statusCodes[statusCode] || 'An unexpected error has occurred'
    console.log('this is a custom error',statusCode)
    return (
      <div style={styles.error}>
        <Head>
          <title>
            {statusCode}: {title}
          </title>
        </Head>
        <div>
          <style dangerouslySetInnerHTML={{__html: 'body { margin: 0 }'}}/>
          {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
          <div style={styles.desc}>
            <h2 style={styles.h2}>{title}.</h2>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  error: {
    color: '#000',
    background: '#fff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle'
  },

  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top'
  },

  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0
  }
}
