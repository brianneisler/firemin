import generateTokenList from './generateTokenList'
import tokenToString from '../token/tokenToString'

const generateString = (context, { ast, tokenList }) => {
  if (ast) {
    tokenList = generateTokenList(context, { ast })
  }
  return tokenList.reduce((result, token) => result + tokenToString(token), '')
}

export default generateString
