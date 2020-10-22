import pino from 'pino'
import { filter, keys, map, values } from 'ramda'

import { ParserTypes } from '../constants'
import * as Nodes from '../parser/nodes'
import {
  BlockStatement,
  Comment,
  Declaration,
  Entry,
  Expression,
  Identifier,
  Keyword,
  Literal,
  Operator,
  PathPartExpression,
  PathPartVariable,
  PathPartWord,
  Program,
  Range,
  Statement,
  Whitespace,
  Word
} from '../parser/nodes'

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

const Identifiers = [
  Program,
  Declaration,
  Expression,
  Statement,
  BlockStatement,
  Identifier,
  Keyword,
  Literal,
  Operator,
  Comment,
  Whitespace,
  Word,
  PathPartExpression,
  PathPartWord,
  PathPartVariable,
  Range,
  Entry
]

/**
 * Sets up the Context object for use by the parser and minimizer
 * @function
 * @since v0.1.0
 * @category context
 * @returns {Context}
 * @example
 * const contxt = setupContext()
 */
const setupContext = ({ logger } = {}) => {
  return {
    Declarations,
    Expressions,
    Identifiers,
    Keywords,
    Operators,
    Statements,
    logger: logger || pino({ prettyPrint: { colorize: true } })
  }
}

export default setupContext
