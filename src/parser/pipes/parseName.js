import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseName = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  name: expression
}))

export default parseName
