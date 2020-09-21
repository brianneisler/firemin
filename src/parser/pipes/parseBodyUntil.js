import { append, curry, slice } from 'ramda'

import { NodeTypes } from '../../constants'
import generateTokenList from '../../generator/generateTokenList'
import Comment from '../nodes/Comment'
import Declaration from '../nodes/Declaration'
import Statement from '../nodes/Statement'
import Whitespace from '../nodes/Whitespace'
import parseNextNode from '../util/parseNextNode'

// NOTE BRN: This needs to be slightly different based on which type of block
// this is (allow, function, etc...)
const BODY_PARSERS = [Comment, Whitespace, Declaration, Statement]
const parseBodyNode = parseNextNode(BODY_PARSERS)

const parseBodyUntil = curry(
  (predicate, { children, context, tokenList, ...rest }) => {
    let body = []

    while (tokenList.size > 0 && predicate({ context, tokenList })) {
      const node = parseBodyNode(context, tokenList)
      children = append(node, children)
      if (
        node.type !== NodeTypes.WHITESPACE &&
        node.type !== NodeTypes.COMMENT
      ) {
        body = append(node, body)
      }

      // NOTE BRN: Remove the parsed tokens from tokenList
      const parsedTokenList = generateTokenList(context, { ast: node })
      tokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    }

    return { ...rest, body, children, context, tokenList }
  }
)

export default parseBodyUntil
