import { createReadStream, pathExists } from 'fs-extra'
import { resolve } from 'path'
import tokenizeStream from './tokenizeStream'

const tokenizeFile = async (context, filePath) => {
  filePath = resolve(filePath)
  if (!(await pathExists(filePath))) {
    throw new Error(`rules file '${filePath}' does not exist`)
  }

  const stream = createReadStream(filePath)
  return await tokenizeStream(context, { stream })
}

export default tokenizeFile
