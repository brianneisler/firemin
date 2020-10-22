import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseAlternate = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  alternate: expression
}))

export default parseAlternate
