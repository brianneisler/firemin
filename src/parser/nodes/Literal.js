import { Buffer } from 'buffer'

import { slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes, TokenTypes } from '../../constants'

const Literal = {
  identify: (context, node) => node,
  is: (value) => value.type === NodeTypes.LITERAL,
  parse: (context, tokenList) => {
    const identifier = tokenList.get(0)
    return {
      id: uuidv4(),
      raw: identifier.value,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.LITERAL,
      value:
        identifier.type === TokenTypes.BYTES
          ? Buffer.from(
              eval(identifier.value.substring(1, identifier.value.length))
            )
          : eval(identifier.value)
    }
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return (
      firstToken &&
      // Booleans & Null
      ((firstToken.type === TokenTypes.IDENTIFIER &&
        (firstToken.value === 'true' ||
          firstToken.value === 'false' ||
          firstToken.value === 'null')) ||
        // Bytes
        firstToken.type === TokenTypes.BYTES ||
        // Numbers
        firstToken.type === TokenTypes.NUMBER ||
        // Strings
        firstToken.type === TokenTypes.STRING)
    )
  }
}

export default Literal
