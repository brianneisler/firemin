import { pipe } from 'ramda'

import parseLiteral from './parseLiteral'

const parseKey = pipe(parseLiteral, ({ literal, ...rest }) => ({
  ...rest,
  key: literal
}))

export default parseKey
