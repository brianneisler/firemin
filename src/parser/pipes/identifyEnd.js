import { pipe } from 'ramda'

import identifyExpression from './identifyExpression'

const identifyEnd = pipe(identifyExpression, ({ expression, ...rest }) => ({
  ...rest,
  end: expression
}))

export default identifyEnd
