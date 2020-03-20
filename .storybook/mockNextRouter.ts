import Router from 'next/router'

const actionWithPromise = () => new Promise((_, reject) => reject())
Router.router = {
  push: actionWithPromise,
  replace: actionWithPromise,
  prefetch: () => {
  },
  route: '/mock-route',
  pathname: 'mock-path'
}
