import { findIdentifier } from '../../ast'
import { NodeTypes } from '../../constants'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Statement = {
  identify: (context, node, ...rest) => {
    const { Statements } = context
    const type = findIdentifier(Statements, node)
    if (!type) {
      throw new Error(`Could not find Statement Identifier for ${node}`)
    }
    return type.identify(context, node, ...rest)
  },
  is: (value) =>
    // TODO BRN: This is pretty hacky and doesn't leave room for expansion.
    // Instead it would be better if the NodeType was EXPRESSION and then
    // we had a sub expressionType
    value.type === NodeTypes.ALLOW_STATEMENT ||
    // value.type === NodeTypes.BLOCK_STATEMENT ||
    value.type === NodeTypes.EXPRESSION_STATEMENT ||
    value.type === NodeTypes.IF_STATEMENT ||
    value.type === NodeTypes.MATCH_STATEMENT ||
    value.type === NodeTypes.RETURN_STATEMENT ||
    value.type === NodeTypes.SERVICE_STATEMENT,
  parse: (context, tokenList) => {
    return parseNextNode(context.Statements, context, tokenList)
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) =>
    testNextNode(context.Statements, context, tokenList)
}

export default Statement
