import { createReadStream } from 'fs-extra'
import tokenizeStream from './tokenizeStream'

const parseFile = async (context, { filePath }) => {
  const stream = createReadStream(filePath)

  // const tokenList = await tokenizeStream(context, { stream })
  // return parseTokenList(context, { tokenList })

  // NOTE BRN: For not just simply returning tokens instead of an AST. Will do
  // that on the next pass.

  return tokenizeStream(context, { stream })
}

export default parseFile
