import parseTokenList from './parseTokenList'
import tokenizeFile from './tokenizeFile'

const parseFile = async (context, filePath) => {
  const tokenList = await tokenizeFile(context, filePath)
  return parseTokenList(context, tokenList)
}

export default parseFile
