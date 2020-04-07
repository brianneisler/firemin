import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Declaration = {
  parse: (context, tokenList) => {
    return parseNextNode(context.Declarations, context, tokenList)
  },

  // NOTE BRN: The first token of a Declaration cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(context.Declarations, context, tokenList)
}

export default Declaration
