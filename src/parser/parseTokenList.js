import { Program } from './nodes'

const parseTokenList = (context, tokenList) => {
  context = {
    ...context,
    originalTokenList: tokenList
  }
  return Program.parse(context, tokenList)
}

export default parseTokenList
