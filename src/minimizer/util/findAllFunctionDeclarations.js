import { List } from 'immutable'

import walkReduceTree from '../../ast/walkReduceTree'
import { NodeTypes } from '../../constants'
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
