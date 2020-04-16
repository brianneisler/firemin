import { append, slice } from 'ramda'
import BlockStatement from '../nodes/BlockStatement'
import generateTokenList from '../../generator/generateTokenList'

const parseBlockStatement = ({ children, context, tokenList, ...rest }) => {
  const blockStatement = BlockStatement.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: blockStatement })
  return {
    ...rest,
    blockStatement,
    children: append(blockStatement, children),
    context,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseBlockStatement
