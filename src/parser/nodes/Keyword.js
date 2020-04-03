import { Keywords, NodeTypes, TokenTypes } from '../../constants'
import { has, invertObj, slice } from 'ramda'

const KEYWORD_VALUES = invertObj(Keywords)

const Keyword = {
  parse: (context, tokenList) => {
    const identifier = tokenList.get(0)
    return {
      name: identifier.value,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.KEYWORD
    }
  },
  test: (tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && has(firstToken.value, KEYWORD_VALUES)
  }
}

export default Keyword
