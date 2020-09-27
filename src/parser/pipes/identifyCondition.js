import { pipe } from 'ramda'

import identifyIfStatement from './identifyIfStatement'

const identifyCondition = pipe(
  identifyIfStatement,
  ({ statement, ...rest }) => ({
    ...rest,
    condition: statement
  })
)

export default identifyCondition
