import { append, slice } from 'ramda'
import Identifier from '../nodes/Identifier'
import generateTokenList from '../../generator/generateTokenList'

const parseIdentifier = ({ children, context, tokenList, ...rest }) => {
  const identifier = Identifier.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: identifier })
  return {
    ...rest,
    children: append(identifier, children),
    identifier,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseIdentifier
