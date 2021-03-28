import { NodeTypes, walkReduceTree } from 'firetree'
import { List } from 'immutable'

import { weakMemoize } from '../../utils'

const findAllFunctionDeclarations = weakMemoize((ast) =>
  walkReduceTree(
    (accum, node) => {
      if (node.type === NodeTypes.FUNCTION_DECLARATION) {
        return accum.push(node)
      }
      return accum
    },
    List(),
    ast
  )
)

export default findAllFunctionDeclarations
