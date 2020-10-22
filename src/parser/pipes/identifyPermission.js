import { pipe } from 'ramda'

import identifyIdentifier from './identifyIdentifier'

const identifyPermission = pipe(
  identifyIdentifier,
  ({ identifier, ...rest }) => ({
    ...rest,
    permission: identifier
  })
)

export default identifyPermission
