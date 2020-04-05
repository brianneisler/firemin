import { createReadStream } from 'fs-extra'
import parseTokenList from './parseTokenList'
import tokenizeStream from './tokenizeStream'

const parseFile = async (context, { filePath }) => {
  const stream = createReadStream(filePath)
  const tokenList = await tokenizeStream(context, { stream })
  return parseTokenList(context, tokenList)
}

export default parseFile
