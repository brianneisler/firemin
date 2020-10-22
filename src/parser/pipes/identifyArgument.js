import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyArgument = pipe(
  identifyExpression,
  ({ expression, ...rest }) => ({
    ...rest,
    argument: expression
  })
)

export default identifyArgument
