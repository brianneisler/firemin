import { curry, find } from 'ramda'

const identifyNextNode = curry((identifiers, context, node, ...rest) => {
  if (!context) {
    throw new Error('context must be defined')
  }
  const nodeIdentifier = find(
    (identifier) => identifier.is(node, ...rest),
    identifiers
  )
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
