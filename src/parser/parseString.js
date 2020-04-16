import parseTokenList from './parseTokenList'
import tokenizeString from './tokenizeString'

const parseString = async (context, string) => {
  const tokenList = await tokenizeString(context, string)
  return parseTokenList(context, tokenList)
}

export default parseString
