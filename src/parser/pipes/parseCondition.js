import { pipe } from 'ramda'

import parseIfStatement from './parseIfStatement'

const parseCondition = pipe(parseIfStatement, ({ statement, ...rest }) => ({
  ...rest,
  condition: statement
}))

export default parseCondition
