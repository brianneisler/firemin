import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Expression = {
  parse: (context, tokenList) => {
    return parseNextNode(context, tokenList, context.Expressions)
  },

  // NOTE BRN: The first token of an Expression cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(context, tokenList, context.Expressions)
}

export default Expression
