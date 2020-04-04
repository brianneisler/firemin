import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Declaration = {
  parse: (context, tokenList) => {
    return parseNextNode(context, tokenList, context.Declarations)
  },

  // NOTE BRN: The first token of a Declaration cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(context, tokenList, context.Declarations)
}

export default Declaration
