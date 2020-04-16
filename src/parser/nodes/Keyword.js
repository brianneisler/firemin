import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Keyword = {
  parse: (context, tokenList, prevExpression = null) =>
    parseNextNode(context.Keywords, context, tokenList, prevExpression),
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Keywords, context, tokenList, prevExpression)
}

export default Keyword
