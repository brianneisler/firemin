import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseArgument = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  argument: expression
}))

export default parseArgument
