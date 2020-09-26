import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyName = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  name: expression
}))

export default identifyName
