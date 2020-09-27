import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Literal from '../nodes/Literal'
import { parseNextNode } from '../util'

const LITERAL_PARSERS = [Literal]
const parseLiteralNode = parseNextNode(LITERAL_PARSERS)

const parseLiteral = ({ children, context, tokenList, ...rest }) => {
  const literal = parseLiteralNode(context, tokenList)
  children = append(literal, children)
  const parsedTokenList = generateTokenList(context, { ast: literal })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, children, context, literal, tokenList }
}

export default parseLiteral
