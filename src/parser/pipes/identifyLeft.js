import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyLeft = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  left: expression
}))

export default identifyLeft
