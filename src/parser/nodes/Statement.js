import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Statement = {
  parse: (context, tokenList) => {
    return parseNextNode(context, tokenList, context.Statements)
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(context, tokenList, context.Statements)
}

export default Statement
