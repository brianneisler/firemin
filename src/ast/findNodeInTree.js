import { isArray, isObject } from 'lodash'
import { concat, curry, keys, reduce, reduced } from 'ramda'

import { walk } from '../utils'

const findWalkee = (node, path, predicate, recur) => {
  const bool = predicate(node, path)
  if (bool) {
    // NOTE BRN: If we receive the break symbol, it means that the node's children
    // should not be explored
    if (bool === Symbol.for('break')) {
      return undefined
    }
    return node
  }
  const { children } = node
  if (isObject(children)) {
    return reduce(
      (acc, childKdx) => {
        const child = children[childKdx]
        const newPath = concat(path, [childKdx])
        const result = recur(child, newPath, predicate)
        if (result) {
          return reduced(result)
        }
      },
      undefined,
      isArray(children) ? children.keys() : keys(children)
    )
  }
}

const findNodeInTree = curry((predicate, tree) =>
  walk(findWalkee, tree, [], predicate)
)

export default findNodeInTree
