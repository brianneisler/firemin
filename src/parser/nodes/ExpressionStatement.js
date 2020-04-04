import { NodeTypes } from '../../constants'
import AssignmentExpression from './AssignmentExpression'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const ExpressionStatementParsers = [AssignmentExpression]

const ExpressionStatement = {
  parse: (context, tokenList) => {
    const expression = parseNextNode(context, tokenList, ExpressionStatementParsers)
    return {
      children: [expression],
      expression,
      type: NodeTypes.EXPRESSION_STATEMENT
    }
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(context, tokenList, ExpressionStatementParsers)
}

export default ExpressionStatement
