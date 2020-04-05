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
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseBlockStatement
