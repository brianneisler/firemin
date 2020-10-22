import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyInit = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  init: expression
}))

export default identifyInit
