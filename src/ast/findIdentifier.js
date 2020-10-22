import { curry, find } from 'ramda'

import { weakMemoize } from '../utils'

const findIdentifier = curry(
  weakMemoize((identifiers, node) => find((Node) => Node.is(node), identifiers))
)
export default findIdentifier
