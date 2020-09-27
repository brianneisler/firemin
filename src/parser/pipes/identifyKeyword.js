import { head, tail } from 'ramda'

import Keyword from '../nodes/Keyword'

const identifyKeyword = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const keyword = Keyword.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    children,
    context,
    keyword
  }
}

export default identifyKeyword
