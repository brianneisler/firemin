import tokenToString from '../token/tokenToString'

import generateTokenList from './generateTokenList'

const generateString = (context, { ast, tokenList }) => {
  if (ast) {
    tokenList = generateTokenList(context, { ast })
  }
  return tokenList.reduce((result, token) => result + tokenToString(token), '')
}

export default generateString
