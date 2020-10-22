import { curry } from 'ramda'

import { findIdentifier } from '../../ast'

const identifyNextNode = curry((identifiers, context, node, ...rest) => {
  if (!context) {
    throw new Error('context must be defined')
  }
  const nodeIdentifier = findIdentifier(identifiers, node)
  if (!nodeIdentifier) {
    throw new Error(
      `Could not identify node '${JSON.stringify(node, null, 2)}'`
    )
  }
  if (!nodeIdentifier.identify) {
    throw new Error(
      `${nodeIdentifier.name} identifier does not implement the 'identify' method.`
    )
  }
  return nodeIdentifier.identify(context, node, ...rest)
})

export default identifyNextNode
