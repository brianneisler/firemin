import { pipe } from 'ramda'

import parseIdentifier from './parseIdentifier'

const parseStaticProperty = pipe(
  parseIdentifier,
  ({ identifier, ...rest }) => ({
    ...rest,
    property: identifier
  })
)

export default parseStaticProperty
