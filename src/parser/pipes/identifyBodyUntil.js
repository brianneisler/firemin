import { append, curry, head, length, tail } from 'ramda'

import { NodeTypes } from '../../constants'
// import Comment from '../nodes/Comment'
// import Declaration from '../nodes/Declaration'
// import Statement from '../nodes/Statement'
// import Whitespace from '../nodes/Whitespace'
// import { identifyNextNode } from '../util'

// NOTE BRN: This needs to be slightly different based on which type of block
// this is (allow, function, etc...)
// const BODY_IDENTIFIERS = [Comment, Whitespace, Declaration, Statement]
// const identifyBodyNode = identifyNextNode(BODY_IDENTIFIERS)

const identifyBodyUntil = curry((predicate, { children, context, ...rest }) => {
  let body = []

  while (length(children) > 0 && !predicate({ children, context })) {
    const nextChild = head(children)
    // const node = identifyBodyNode(context, nextChild)
    children = tail(children)
    if (
      nextChild.type !== NodeTypes.WHITESPACE &&
      nextChild.type !== NodeTypes.COMMENT
    ) {
      body = append(nextChild, body)
    }
  }

  return { ...rest, body, children, context }
})

export default identifyBodyUntil
