import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import parseNextNode from '../util/parseNextNode'

const EXPRESSION_STATEMENT_PARSERS = [Expression, Identifier, Literal]

const parseExpression = ({ children, context, tokenList, ...rest }) => {
  const expression = parseNextNode(
    EXPRESSION_STATEMENT_PARSERS,
    context,
    tokenList
  )
  const parsedTokenList = generateTokenList(context, { ast: expression })
  return {
    ...rest,
    children: append(expression, children),
    context,
    expression,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseExpression
