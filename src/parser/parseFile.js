import { createReadStream, pathExists } from 'fs-extra'
import { resolve } from 'path'
import parseTokenList from './parseTokenList'
import tokenizeStream from './tokenizeStream'

const parseFile = async (context, filePath) => {
  filePath = resolve(filePath)
  if (!(await pathExists(filePath))) {
    throw new Error(`rules file '${filePath}' does not exist`)
  }

  const stream = createReadStream(filePath)
  const tokenList = await tokenizeStream(context, { stream })
  return parseTokenList(context, tokenList)
}

export default parseFile
