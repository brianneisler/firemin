import { findIdentifier } from '../../ast'
import { NodeTypes } from '../../constants'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Declaration = {
  identify: (context, node, ...rest) => {
    const { Declarations } = context
    const type = findIdentifier(Declarations, node)
    if (!type) {
      throw new Error(`Could not find Declaration Identifier for ${node}`)
    }
    return type.identify(context, node, ...rest)
  },
  is: (value) =>
    value.type === NodeTypes.FUNCTION_DECLARATION ||
    value.type === NodeTypes.LET_DECLARATION,
  parse: (context, tokenList) =>
    parseNextNode(context.Declarations, context, tokenList),
  // NOTE BRN: The first token of a Declaration cannot be Whitespace or a Comment
  test: (context, tokenList) =>
    testNextNode(context.Declarations, context, tokenList)
}

export default Declaration
