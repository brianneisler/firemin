import ExpressionStatement from './ExpressionStatement'
import parseNextNode from '../parseNextNode'
import testNextNode from '../testNextNode'

const StatementNodeParsers = [ExpressionStatement]

const Statement = {
  parse: (context, tokenList) => {
    return parseNextNode(tokenList, StatementNodeParsers)
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (tokenList) => testNextNode(tokenList, StatementNodeParsers)
}

export default Statement
