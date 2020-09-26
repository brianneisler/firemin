import { isFunction } from 'lodash'
import { curry } from 'ramda'

import {
  Comment,
  Declaration,
  Expression,
  Identifier,
  Keyword,
  Literal,
  Operator,
  Program,
  Statement,
  Whitespace
} from '../parser/nodes'

const IDENTIFIERS = [
  Program,
  Declaration,
  Expression,
  Statement,
  Identifier,
  Keyword,
  Literal,
  Operator,
  Comment,
  Whitespace
]

const identifyNode = curry((context, node) => {
  // TODO BRN: Find the Node that is responsible for this node.
  // Check if Node has an identify implementation.
  // If so, call that method, otherwise, return node

  return node
})

export default identifyNode
