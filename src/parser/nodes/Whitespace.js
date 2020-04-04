import { NodeTypes, TokenTypes } from '../../constants'
import { slice } from 'ramda'

const Whitespace = {
  parse: (context, tokenList) => {
    return {
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.WHITESPACE
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.WHITESPACE
}

export default Whitespace
