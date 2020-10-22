import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseValue = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  value: expression
}))

export default parseValue
