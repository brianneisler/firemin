import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyRight = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  right: expression
}))

export default identifyRight
