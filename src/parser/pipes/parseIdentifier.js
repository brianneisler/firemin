import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import Identifier from '../nodes/Identifier'

const parseIdentifier = ({ children, context, tokenList, ...rest }) => {
  const identifier = Identifier.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: identifier })
  return {
    ...rest,
    children: append(identifier, children),
    context,
    identifier,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseIdentifier
