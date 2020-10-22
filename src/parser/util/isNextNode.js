import { any } from 'ramda'

const isNextNode = (identifiers, node, ...rest) =>
  any((identifier) => {
    if (!identifier.is) {
      throw new Error(
        `${identifier.name} identifier does not implement the 'test' method.`
      )
    }
    return identifier.is(node, ...rest)
  }, identifiers)

export default isNextNode
