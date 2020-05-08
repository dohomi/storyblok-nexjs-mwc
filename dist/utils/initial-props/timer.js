var startTime, endTime;
export function startMeasureTime(message) {
    startTime = new Date().getTime();
    console.log(message || 'start measure time');
}
export function endMeasureTime(message) {
    if (message === void 0) { message = ''; }
    endTime = new Date().getTime();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
    // get seconds
    var seconds = Math.round(timeDiff);
    console.log("finish " + message + ": " + seconds);
}
