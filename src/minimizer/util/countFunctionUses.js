import { Map } from 'immutable'

import walkReduceTree from '../../ast/walkReduceTree'
import { NodeTypes } from '../../constants'
import { weakMemoize } from '../../utils'

import findAllFunctionDeclrations from './findAllFunctionDeclarations'
import getFunctionDeclarationByNameInScope from './getFunctionDeclarationByNameInScope'

const countFunctionUses = weakMemoize((scopes, ast) => {
  const functionDeclarations = findAllFunctionDeclrations(ast)
  return walkReduceTree(
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
            return accum.update(functionDeclaration.id, (value) => value + 1)
          }
        }
      }
      return accum
    },
    functionDeclarations.reduce(
      (accum, functionDeclaration) => accum.set(functionDeclaration.id, 0),
      Map()
    ),
    ast
  )
})

export default countFunctionUses
