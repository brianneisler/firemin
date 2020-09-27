import { pipe } from 'ramda'

import identifyBlockStatement from './identifyBlockStatement'

const identifyBody = pipe(
  identifyBlockStatement,
  ({ blockStatement, ...rest }) => ({
    ...rest,
    body: blockStatement
  })
)

export default identifyBody
