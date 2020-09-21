import { append, pipe, slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import { NodeTypes } from '../../constants'
import generateTokenList from '../../generator/generateTokenList'
import parseColonOperator from '../pipes/parseColonOperator'
import parseWhitespaceAndComments from '../pipes/parseWhitespaceAndComments'
import { parseNextNode } from '../util'

import Expression from './Expression'
import Identifier from './Identifier'
import Literal from './Literal'

const VALUE_PARSERS = [Expression, Identifier, Literal]
const parseValueNode = parseNextNode(VALUE_PARSERS)

const parseValue = ({ children, context, tokenList, ...rest }) => {
  const value = parseValueNode(context, tokenList)
  children = append(value, children)
  const parsedTokenList = generateTokenList(context, { ast: value })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, children, context, tokenList, value }
}

const KEY_PARSERS = [Literal]
const parseKeyNode = parseNextNode(KEY_PARSERS)

const parseKey = ({ children, context, tokenList, ...rest }) => {
  const key = parseKeyNode(context, tokenList)
  children = append(key, children)
  const parsedTokenList = generateTokenList(context, { ast: key })
  tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
  return { ...rest, children, context, key, tokenList }
}

const createEntry = pipe(
  parseKey,
  parseWhitespaceAndComments,
  parseColonOperator,
  parseWhitespaceAndComments,
  parseValue,
  ({ children, key, value }) => ({
    children,
    id: uuidv4(),
    key,
    type: NodeTypes.ENTRY,
    value
  })
)

const Entry = {
  parse: (context, tokenList) =>
    createEntry({ children: [], context, tokenList }),
  test: () => false
}

export default Entry
