import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyElement = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  element: expression
}))

export default identifyElement
