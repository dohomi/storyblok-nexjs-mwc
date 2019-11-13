import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

export default function useDeviceChange() {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const lg = useMediaQuery(theme.breakpoints.only('lg'))
  const xl = useMediaQuery(theme.breakpoints.only('xl'))
  const stringified = JSON.stringify({ xs, sm, md, lg, xl })
  const [changed, setChanged] = useState<string>(stringified)

  useEffect(
    () => {
      if (changed !== stringified) {
        console.log('inside of changed', changed, stringified)

        setChanged(stringified)
      }
    },
    [stringified, changed]
  )
  console.log("inside of device change")
  return changed
}
