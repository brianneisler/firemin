import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Expression from '../nodes/Expression'
import Identifier from '../nodes/Identifier'
import Literal from '../nodes/Literal'
import { parseNextNode } from '../util'

const ARGUMENT_PARSERS = [Expression, Identifier, Literal]
const parseArgumentNode = parseNextNode(ARGUMENT_PARSERS)

const parseArgument = ({ children, context, tokenList, ...rest }) => {
  const argument = parseArgumentNode(context, tokenList)
  children = append(argument, children)
  const parsedTokenList = generateTokenList(context, { ast: argument })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, argument, children, context, tokenList }
}

export default parseArgument
