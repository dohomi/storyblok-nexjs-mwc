/**
 *
 * @param {string} event
 * @param {function} cb
 * @return {function(): void}
 */
export function addEvent (event, cb) {
  window.addEventListener(event, cb, false)
  return () => window.removeEventListener(event, cb, false)
}
