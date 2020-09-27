import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseInit = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  init: expression
}))

export default parseInit
