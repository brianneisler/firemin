import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseEnd = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  end: expression
}))

export default parseEnd
