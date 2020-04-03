import { NodeTypes, TokenTypes } from '../../constants'
import { slice } from 'ramda'

const Identifier = {
  parse: (context, tokenList) => {
    const identifier = tokenList.get(0)
    if (identifier.type !== TokenTypes.IDENTIFIER) {
      throw new Error('Expected Identifier')
    }

    return {
      name: identifier.value,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.IDENTIFIER
    }
  },
  test: (tokenList) => tokenList.get(0).type === TokenTypes.IDENTIFIER
}

export default Identifier
