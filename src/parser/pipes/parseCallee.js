import { append, pipe } from 'ramda'

import parseIdentifier from './parseIdentifier'

const parseCalleeIdentifier = pipe(
  parseIdentifier,
  ({ identifier, ...rest }) => ({
    ...rest,
    callee: identifier
  })
)

const parseCallee = (props) => {
  const { children, prevExpression } = props
  if (prevExpression) {
    return {
      ...props,
      callee: prevExpression,
      children: append(prevExpression, children)
    }
  }
  return parseCalleeIdentifier({ ...props })
}

export default parseCallee
