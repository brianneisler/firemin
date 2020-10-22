import { pipe } from 'ramda'

import identifyLiteral from './identifyLiteral'

const identifyKey = pipe(identifyLiteral, ({ literal, ...rest }) => ({
  ...rest,
  key: literal
}))

export default identifyKey
