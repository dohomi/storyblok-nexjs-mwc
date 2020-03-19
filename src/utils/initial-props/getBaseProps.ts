import { AppPageProps } from '../parsePageProperties'
import deviceDetect from '../deviceDetect'
import { IncomingMessage } from 'http'

export const getBaseProps = (error: any, req: IncomingMessage | undefined): AppPageProps => ({
  page: { _uid: '', component: 'page' },
  error,
  settings: { _uid: '', component: 'global', theme_base: 'base' },
  allCategories: [],
  allStories: [],
  allStaticContent: [],
  locale: '',
  hasWebpSupport: false,
  device: deviceDetect(req)
})
