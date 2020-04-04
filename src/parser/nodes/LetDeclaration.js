import { NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import { slice } from 'ramda'

const LetDeclaration = {
  parse: (context, tokenList) => {
    let children = [
      { type:  }
    ]
    return {
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.WHITESPACE
    }
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.IDENTIFIER && firstToken.value === 'let'
  },
  type: ParserTypes.DECLARATION
}

export default LetDeclaration
