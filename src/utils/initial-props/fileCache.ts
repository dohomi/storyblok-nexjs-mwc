const cacheManager = require('cache-manager')
// const fsStore = require('cache-manager-fs')
export const diskCache = cacheManager.caching({
  store: 'memory',
  ttl: 0 /* seconds */,
  // preventfill: true,
  max: 0 /* max size in bytes on disk */

  // path: '.next/cache/diskCache/'
})
