import { promises, unlinkSync } from 'fs'

const readFile = promises.readFile
const writeFile = promises.writeFile
const fileStats = promises.stat
const cacheRootPath = ''
const cacheFiles: string[] = []

export const clearFileCache = () => {
  for (const filename of cacheFiles) {
    try {
      unlinkSync(filename)
    } catch (e) {
      console.log('filecache file does not exist: ' + filename)
    }
  }
}

const getFullPath = (filename: string): string => `${cacheRootPath}${filename}.json`


export const checkCacheFileExists = (filename: string) => {
  return fileStats(getFullPath(filename))
    .then(r => r.isFile())
}

export const readCacheFile = async (filename: string) => {
  const content = await readFile(getFullPath(filename), 'utf8')
  const data = JSON.parse(content)
  return data
}

export const writeCacheFile = async (filename: string, content: any) => {
  const pathName = getFullPath(filename)
  try {
    if (!cacheFiles.includes(pathName)) {
      cacheFiles.push(pathName)
    }
    await writeFile(pathName, JSON.stringify(content), 'utf8')
  } catch (e) {
    console.error(e)
  }
}
