import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Operator = {
  parse: (context, tokenList, prevExpression = null) =>
    parseNextNode(context.Operators, context, tokenList, prevExpression),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Operators, context, tokenList, prevExpression)
}

export default Operator
