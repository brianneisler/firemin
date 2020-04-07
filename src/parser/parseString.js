import parseTokenList from './parseTokenList'
import stringToStream from 'string-to-stream'
import tokenizeStream from './tokenizeStream'

const parseString = async (context, string) => {
  const stream = stringToStream(string)
  const tokenList = await tokenizeStream(context, { stream })
  return parseTokenList(context, tokenList)
}

export default parseString
