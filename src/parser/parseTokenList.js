import { filter, keys, map, values } from 'ramda'

import { ParserTypes } from '../constants'

import * as Nodes from './nodes'
import { Program } from './nodes'

const NamedNodes = map((name) => {
  // eslint-disable-next-line import/namespace
  const Node = Nodes[name]
  Node.name = name
  return Node
}, keys(Nodes))

const Declarations = filter(
  (parser) => parser.type === ParserTypes.DECLARATION,
  values(NamedNodes)
)
const Expressions = filter(
  (parser) => parser.type === ParserTypes.EXPRESSION,
  values(NamedNodes)
)
const Keywords = filter(
  (parser) => parser.type === ParserTypes.KEYWORD,
  values(NamedNodes)
)
const Operators = filter(
  (parser) => parser.type === ParserTypes.OPERATOR,
  values(NamedNodes)
)
const Statements = filter(
  (parser) => parser.type === ParserTypes.STATEMENT,
  values(NamedNodes)
)

const parseTokenList = (context, tokenList) => {
  context = {
    ...context,
    Declarations,
    Expressions,
    Keywords,
    Operators,
    Statements,
    originalTokenList: tokenList
  }
  return Program.parse(context, tokenList)
}

export default parseTokenList
