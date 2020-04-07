import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Expression = {
  parse: (context, tokenList) => {
    return parseNextNode(context.Expressions, context, tokenList)
  },

  // NOTE BRN: The first token of an Expression cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(context.Expressions, context, tokenList)
}

export default Expression
