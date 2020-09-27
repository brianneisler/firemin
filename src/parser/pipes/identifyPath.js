import { pipe } from 'ramda'

import identifyPathExpression from './identifyPathExpression'

const identifyPath = pipe(
  identifyPathExpression,
  ({ expression, ...rest }) => ({
    ...rest,
    path: expression
  })
)

export default identifyPath
