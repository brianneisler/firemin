import { pipe } from 'ramda'

import parseIdentifier from './parseIdentifier'

const parsePermission = pipe(parseIdentifier, ({ identifier, ...rest }) => ({
  ...rest,
  permission: identifier
}))

export default parsePermission
