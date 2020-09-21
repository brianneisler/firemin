import { filter, keys, map, values } from 'ramda'

import { ParserTypes } from '../constants'

import * as Nodes from './nodes'
import { Program } from './nodes'

const NodeParsers = map((name) => {
  // eslint-disable-next-line import/namespace
  const NodeParser = Nodes[name]
  NodeParser.name = name
  return NodeParser
}, keys(Nodes))

const Declarations = filter(
  (parser) => parser.type === ParserTypes.DECLARATION,
  values(NodeParsers)
)
const Expressions = filter(
  (parser) => parser.type === ParserTypes.EXPRESSION,
  values(NodeParsers)
)
const Keywords = filter(
  (parser) => parser.type === ParserTypes.KEYWORD,
  values(NodeParsers)
)
const Operators = filter(
  (parser) => parser.type === ParserTypes.OPERATOR,
  values(NodeParsers)
)
const Statements = filter(
  (parser) => parser.type === ParserTypes.STATEMENT,
  values(NodeParsers)
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
