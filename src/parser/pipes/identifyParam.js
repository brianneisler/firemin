import { pipe } from 'ramda'

import identifyIdentifier from './identifyIdentifier'

const identifyParam = pipe(identifyIdentifier, ({ identifier, ...rest }) => ({
  param: identifier,
  ...rest
}))

export default identifyParam
