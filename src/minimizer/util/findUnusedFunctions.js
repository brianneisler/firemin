import { Map } from 'immutable'

import walkReduceAST from '../../ast/walkReduceAST'
import { NodeTypes } from '../../constants'

import findAllFunctionDeclrations from './findAllFunctionDeclrations'
import getFunctionDeclarationByNameInScope from './getFunctionDeclarationByNameInScope'

const findUnusedFunctions = (scopes, ast) => {
  const functionDeclarations = findAllFunctionDeclrations(ast)
  const functionUsed = walkReduceAST(
    (accum, node) => {
      if (node.type === NodeTypes.CALL_EXPRESSION) {
        const { callee } = node
        if (callee.type === NodeTypes.IDENTIFIER) {
          const scope = scopes.get(node.id)
          if (!scope) {
            throw new Error(`Could not find scope for node ${node}`)
          }
          const functionDeclaration = getFunctionDeclarationByNameInScope(
            callee.name,
            scope
          )
          if (functionDeclaration) {
            return accum.set(functionDeclaration.id, true)
          }
        }
      }
      return accum
    },
    functionDeclarations.reduce(
      (accum, functionDeclaration) => accum.set(functionDeclaration.id, false),
      Map()
    ),
    ast
  )
  return functionUsed.filter((used) => !used)
}

export default findUnusedFunctions
