import { NodeTypes } from '../../constants'
import AssignmentExpression from './AssignmentExpression'
import parseNextNode from '../parseNextNode'
import testNextNode from '../testNextNode'

const ExpressionStatementNodeParsers = [AssignmentExpression]

const ExpressionStatement = {
  parse: (context, tokenList) => {
    const expression = parseNextNode(tokenList, ExpressionStatementNodeParsers)
    return {
      expression,
      type: NodeTypes.EXPRESSION_STATEMENT
    }
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (tokenList) => testNextNode(tokenList, ExpressionStatementNodeParsers)
}

export default ExpressionStatement
