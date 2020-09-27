import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseElement = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  element: expression
}))

export default parseElement
