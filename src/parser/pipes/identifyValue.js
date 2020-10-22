import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyValue = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  value: expression
}))

export default identifyValue
