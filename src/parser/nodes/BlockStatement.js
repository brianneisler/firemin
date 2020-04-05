import { NodeTypes, TokenTypes } from '../../constants'
import Comment from './Comment'
import Declaration from './Declaration'
import Statement from './Statement'
import Whitespace from './Whitespace'
import parseNextNode from '../util/parseNextNode'

// NOTE BRN: This needs to be slightly different based on which type of block
// this is (allow, function, etc...)
const BodyParsers = [Comment, Whitespace, Declaration, Statement]

const BlockStatement = {
  parse: (context, tokenList) => {
    const expression = parseNextNode(context, tokenList, ExpressionStatementParsers)
    return {
      children: [expression],
      expression,
      type: NodeTypes.EXPRESSION_STATEMENT
    }
  },

  // NOTE BRN: The first token of a Statement cannot be Whitespace or a Comment
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.OPERATOR_OPEN_CURLY_BRACE
  }
}

export default BlockStatement
