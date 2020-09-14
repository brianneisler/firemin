import { pipe } from 'ramda'

import parsePathExpression from './parsePathExpression'

const parsePath = pipe(parsePathExpression, ({ expression, ...rest }) => ({
  ...rest,
  path: expression
}))

export default parsePath
