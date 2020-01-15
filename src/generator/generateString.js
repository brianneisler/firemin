import tokenToString from '../token/tokenToString'

const generateString = async (context, { tokenList }) =>
  tokenList.reduce((result, token) => result + tokenToString(token), '')

export default generateString
