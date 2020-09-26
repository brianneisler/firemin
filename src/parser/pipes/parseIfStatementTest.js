import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseIfStatementTest = pipe(
  parseExpression,
  ({ expression, ...rest }) => ({
    ...rest,
    test: expression
  })
)

export default parseIfStatementTest
