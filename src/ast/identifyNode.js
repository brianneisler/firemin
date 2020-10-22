import { curry } from 'ramda'

import findIdentifier from './findIdentifier'

const identifyNode = curry((context, node) => {
  const identifier = findIdentifier(context.Identifiers, node)
  if (!identifier) {
    throw new Error(
      `Could not find Identifier for ${JSON.stringify(node, null, 2)}`
    )
  }
  return identifier.identify(context, node)
})

export default identifyNode
