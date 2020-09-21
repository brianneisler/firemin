import { slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, TokenTypes } from '../../constants'

const Whitespace = {
  parse: (context, tokenList) => {
    return {
      id: uuidv4(),
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.WHITESPACE
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.WHITESPACE
}

export default Whitespace
