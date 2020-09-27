import { pipe } from 'ramda'

import parseIdentifier from './parseIdentifier'

const parseParam = pipe(parseIdentifier, ({ identifier, ...rest }) => ({
  param: identifier,
  ...rest
}))

export default parseParam
