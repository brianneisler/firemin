import { pipe } from 'ramda'

import parseExpression from './parseExpression'

const parseConsequent = pipe(parseExpression, ({ expression, ...rest }) => ({
  ...rest,
  consequent: expression
}))

export default parseConsequent
