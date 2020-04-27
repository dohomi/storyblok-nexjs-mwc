let startTime: number, endTime: number

export function startMeasureTime(message: string) {
  startTime = new Date().getTime()
  console.log(message || 'start measure time')
}

export function endMeasureTime() {
  endTime = new Date().getTime()
  let timeDiff = endTime - startTime //in ms
  // strip the ms
  timeDiff /= 1000

  // get seconds
  const seconds = Math.round(timeDiff)
  console.log('finish measure time: ' + seconds)
}

