import { slice } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createIdentifier from '../pipes/createIdentifier'

const Identifier = {
  identify: (context, node) => node,
  is: (value) => value.type === NodeTypes.IDENTIFIER,
  parse: (context, tokenList) => {
    const identifier = tokenList.get(0)
    if (identifier.type !== TokenTypes.IDENTIFIER) {
      throw new Error('Expected Identifier')
    }

    return createIdentifier({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.IDENTIFIER
}

export default Identifier
