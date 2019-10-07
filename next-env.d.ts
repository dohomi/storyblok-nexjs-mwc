/// <reference types="next" />
/// <reference types="next/types/global" />

interface RootComponentProps {
  content: any
}

declare global {
  interface Window {
    userDevice: any
    hasWebpSupport: boolean
  }
}
