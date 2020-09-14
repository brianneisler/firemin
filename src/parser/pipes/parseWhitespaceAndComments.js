import { append, tail } from 'ramda'

import { NodeTypes } from '../../constants'
import Comment from '../nodes/Comment'
import Whitespace from '../nodes/Whitespace'

const parseWhitespaceAndComments = ({
  children,
  context,
  tokenList,
  ...rest
}) => {
  let stop = false
  while (tokenList.size > 0 && !stop) {
    const nextToken = tokenList.get(0)
    if (nextToken.type === NodeTypes.WHITESPACE) {
      children = append(Whitespace.parse(context, tokenList), children)
      tokenList = tail(tokenList)
    } else if (nextToken.type === NodeTypes.COMMENT) {
      children = append(Comment.parse(context, tokenList), children)
      tokenList = tail(tokenList)
    } else {
      stop = true
    }
  }

  return { children, context, tokenList, ...rest }
}

export default parseWhitespaceAndComments
