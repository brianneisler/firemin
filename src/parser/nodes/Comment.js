import { NodeTypes, TokenTypes } from '../../constants'
import { slice } from 'ramda'

const Comment = {
  parse: (context, tokenList) => {
    return {
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.COMMENT,
      value: tokenList.get(0).value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.COMMENT
}

export default Comment
