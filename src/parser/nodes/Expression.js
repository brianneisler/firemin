import { slice } from 'ramda'

import { findIdentifier } from '../../ast'
import { NodeTypes } from '../../constants'
import generateTokenList from '../../generator/generateTokenList'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Expression = {
  identify: (context, node, ...rest) => {
    const { Expressions } = context
    const type = findIdentifier(Expressions, node)
    if (!type) {
      throw new Error(`Could not find Expression Node for ${node}`)
    }
    return type.identify(context, node, ...rest)
  },
  is: (value) =>
    // TODO BRN: This is pretty hacky and doesn't leave room for expansion.
    // Instead it would be better if the NodeType was EXPRESSION and then
    // we had a sub expressionType
    value.type === NodeTypes.ASSIGNMENT_EXPRESSION ||
    value.type === NodeTypes.BINARY_EXPRESSION ||
    value.type === NodeTypes.CALL_EXPRESSION ||
    value.type === NodeTypes.COMPUTED_MEMBER_EXPRESSION ||
    value.type === NodeTypes.CONDITIONAL_EXPRESSION ||
    value.type === NodeTypes.LIST_EXPRESSION ||
    value.type === NodeTypes.MAP_EXPRESSION ||
    value.type === NodeTypes.PARENTHESES_EXPRESSION ||
    value.type === NodeTypes.PATH_EXPRESSION ||
    value.type === NodeTypes.STATIC_MEMBER_EXPRESSION ||
    value.type === NodeTypes.UNARY_EXPRESSION,
  parse: (context, tokenList, prevExpression = null) => {
    let expression = parseNextNode(
      context.Expressions,
      context,
      tokenList,
      prevExpression
    )
    let parsedTokenList = generateTokenList(context, { ast: expression })
    let nextTokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    while (
      testNextNode(context.Expressions, context, nextTokenList, expression)
    ) {
      expression = parseNextNode(
        context.Expressions,
        context,
        nextTokenList,
        expression
      )
      parsedTokenList = generateTokenList(context, { ast: expression })
      nextTokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    }
    return expression
  },

  // NOTE BRN: The first token of an Expression cannot be Whitespace or a Comment
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Expressions, context, tokenList, prevExpression)
}

export default Expression
