import { curry } from 'ramda'

import assocNodePath from './assocNodePath'
import walkReduceTree from './walkReduceTree'

const walkMapTree = curry((context, iteratee, tree) =>
  walkReduceTree(
    (accum, node, keys) => {
      const result = iteratee(node, keys, tree)
      if (result !== node) {
        return assocNodePath(context, keys, result, accum)
      }
      return accum
    },
    tree,
    tree
  )
)

export default walkMapTree
