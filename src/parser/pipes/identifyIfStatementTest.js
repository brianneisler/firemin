import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyIfStatementTest = pipe(
  identifyExpression,
  ({ expression, ...rest }) => ({
    ...rest,
    test: expression
  })
)

export default identifyIfStatementTest
