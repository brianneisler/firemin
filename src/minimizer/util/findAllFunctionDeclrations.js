import { List } from 'immutable'

import walkReduceAST from '../../ast/walkReduceAST'
import { NodeTypes } from '../../constants'

const findAllFunctionDeclrations = (ast) =>
  walkReduceAST(
    (accum, node) => {
      if (node.type === NodeTypes.FUNCTION_DECLARATION) {
        return accum.push(node)
      }
      return accum
    },
    List(),
    ast
  )

export default findAllFunctionDeclrations
