import { List } from 'immutable'
import { NodeTypes } from '../../constants'
import walkReduceAST from '../../ast/walkReduceAST'

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
