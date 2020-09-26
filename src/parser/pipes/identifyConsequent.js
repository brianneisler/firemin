import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyConsequent = pipe(
  identifyExpression,
  ({ expression, ...rest }) => ({
    ...rest,
    consequent: expression
  })
)

export default identifyConsequent
