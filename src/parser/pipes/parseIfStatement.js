import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import IfStatement from '../nodes/IfStatement'

const parseIfStatement = ({ children, context, tokenList, ...rest }) => {
  const statement = IfStatement.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: statement })
  return {
    ...rest,
    children: append(statement, children),
    context,
    statement,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseIfStatement
