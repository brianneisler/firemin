import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyAlternate = pipe(
  identifyExpression,
  ({ expression, ...rest }) => ({
    ...rest,
    alternate: expression
  })
)

export default identifyAlternate
