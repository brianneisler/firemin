import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseRight = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  right: expression
}))

export default parseRight
