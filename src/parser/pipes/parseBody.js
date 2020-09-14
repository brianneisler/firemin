import { pipe } from 'ramda'

import parseBlockStatement from './parseBlockStatement'

const parseBody = pipe(parseBlockStatement, ({ blockStatement, ...rest }) => ({
  ...rest,
  body: blockStatement
}))

export default parseBody
