import { length, tail } from 'ramda'

import Comment from '../nodes/Comment'
import Whitespace from '../nodes/Whitespace'

const skipWhitespaceAndComments = ({ children, ...rest }) => {
  let stop = false
  while (length(children) > 0 && !stop) {
    const nextChild = children[0]
    if (Whitespace.is(nextChild) || Comment.is(nextChild)) {
      children = tail(children)
    } else {
      stop = true
    }
  }
  return { ...rest, children }
}

export default skipWhitespaceAndComments
