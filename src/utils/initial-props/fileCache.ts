import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const cacheRootPath = '.next/cache/'
const cacheFiles: string[] = []

export const clearFileCache = () => {
  for (const filename of cacheFiles) {
    try {
      fs.unlinkSync(filename)
    } catch (e) {
      console.log('filecache file does not exist: ' + filename)
    }
  }
}

const getFullPath = (filename: string): string => `${cacheRootPath}${filename}.json`


export const checkCacheFileExists = (filename: string) => {
  return fs.existsSync(getFullPath(filename))
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
