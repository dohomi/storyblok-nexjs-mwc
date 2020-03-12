import { useEffect, useState } from 'react'
import { getImage } from '../fetchImageHelper'

export function useGetSrcHook(imageAttrs: { src?: string, srcSet?: string }) {
  const [source, setSource] = useState<string | undefined>()
  const { src, srcSet } = imageAttrs

  useEffect(
    () => {
      if (src && srcSet) {
        getImage({
          src: src,
          srcSet: srcSet,
          onReady(imageSource: string) {
            setSource(imageSource)
          }
        })
      }
    },
    [src, srcSet]
  )

  return source
}
