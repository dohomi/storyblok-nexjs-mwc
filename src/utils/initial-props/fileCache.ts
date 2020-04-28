import fs from 'fs'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const cacheRootPath = '.next/cache/custom-app-content/'
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

export const readCacheFile = async (filename: string) => {
  const content = await readFile(`${cacheRootPath}${filename}.json`, 'utf8')
  const data = JSON.parse(content)
  return data
}

export const writeCacheFile = async (filename: string, content: any) => {
  const pathName = `${cacheRootPath}${filename}.json`
  try {
    if (!cacheFiles.includes(pathName)) {
      cacheFiles.push(pathName)
    }
    await writeFile(pathName, JSON.stringify(content), 'utf8')
  } catch (e) {
    console.error(e)
  }
}
