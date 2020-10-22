import { pipe } from 'ramda'

import identifyIdentifier from './identifyIdentifier'

const identifyStaticProperty = pipe(
  identifyIdentifier,
  ({ identifier, ...rest }) => ({
    ...rest,
    property: identifier
  })
)

export default identifyStaticProperty
