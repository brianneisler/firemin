import { NodeTypes, ParserTypes } from '../../constants'
import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const ExpressionStatementParsers = [Expression, Identifier, Literal]

const ExpressionStatement = {
  parse: (context, tokenList) => {
    const expression = parseNextNode(ExpressionStatementParsers, context, tokenList)
    return {
      children: [expression],
      expression,
      type: NodeTypes.EXPRESSION_STATEMENT
    }
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) => testNextNode(ExpressionStatementParsers, context, tokenList),
  type: ParserTypes.STATEMENT
}

export default ExpressionStatement
