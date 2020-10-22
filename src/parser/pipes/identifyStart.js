import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyStart = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  start: expression
}))

export default identifyStart
