import { head, tail } from 'ramda'

import Identifier from '../nodes/Identifier'

const identifyIdentifier = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const identifier = Identifier.identify(context, nextChild)
  children = tail(children)
  return { ...rest, children, context, identifier }
}

export default identifyIdentifier
