import { head, tail } from 'ramda'

import PathExpression from '../nodes/PathExpression'

const identifyPathExpression = ({ children, context, ...rest }) => {
  const nextChild = head(children)
  const expression = PathExpression.identify(context, nextChild)
  children = tail(children)
  return {
    ...rest,
    children,
    context,
    expression
  }
}

export default identifyPathExpression
