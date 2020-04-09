import { append, slice } from 'ramda'
import IfStatement from '../nodes/IfStatement'
import generateTokenList from '../../generator/generateTokenList'

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
