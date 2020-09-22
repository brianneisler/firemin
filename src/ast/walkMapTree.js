import { curry } from 'ramda'

import assocNodePath from './assocNodePath'
import walkReduceTree from './walkReduceTree'

const walkMapTree = curry((iteratee, tree) =>
  walkReduceTree(
    (accum, node, keys) => {
      const result = iteratee(node, keys)
      if (result !== node) {
        return assocNodePath(keys, result, accum)
      }
      return accum
    },
    tree,
    tree
  )
)

export default walkMapTree
