import { curry, find } from 'ramda'

import {
  BlockStatement,
  Comment,
  Declaration,
  Expression,
  Identifier,
  Keyword,
  Literal,
  Operator,
  PathPartVariable,
  PathPartWord,
  Program,
  Range,
  Statement,
  Whitespace,
  Word
} from '../parser/nodes'

const IDENTIFIERS = [
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
  PathPartWord,
  PathPartVariable,
  Range
]

const identifyNode = curry((context, node) => {
  const identifier = find((Node) => Node.is(node), IDENTIFIERS)
  if (!identifier) {
    throw new Error(
      `Could not find Identifier for ${JSON.stringify(node, null, 2)}`
    )
  }
  return identifier.identify(context, node)
})

export default identifyNode
