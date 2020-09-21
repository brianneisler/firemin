import { slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Expression = {
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
