import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyTest = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  test: expression
}))

export default identifyTest
