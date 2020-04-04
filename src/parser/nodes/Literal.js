import { Buffer } from 'buffer'
import { NodeTypes, TokenTypes } from '../../constants'
import { slice } from 'ramda'

const Literal = {
  parse: (context, tokenList) => {
    const identifier = tokenList.get(0)
    return {
      raw: identifier.value,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.LITERAL,
      value:
        identifier.type === TokenTypes.BYTES
          ? Buffer.from(JSON.parse(identifier.value.substring(1, identifier.value.length)))
          : JSON.parse(identifier.value)
    }
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return (
      // Booleans & Null
      (firstToken.type === TokenTypes.IDENTIFIER &&
        (firstToken.value === 'true' ||
          firstToken.value === 'false' ||
          firstToken.value === 'null')) ||
      // Bytes
      firstToken.type === TokenTypes.BYTES ||
      // Numbers
      firstToken.type === TokenTypes.NUMBER ||
      // Strings
      firstToken.type === TokenTypes.STRING
    )
  }
}

export default Literal
