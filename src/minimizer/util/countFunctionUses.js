import { OrderedMap } from 'immutable'

import walkReduceTree from '../../ast/walkReduceTree'
import { NodeTypes } from '../../constants'
import { weakMemoize } from '../../utils'

import findAllFunctionDeclrations from './findAllFunctionDeclarations'
import getFunctionDeclarationByNameInScope from './getFunctionDeclarationByNameInScope'

const countFunctionUses = weakMemoize(({ scopes }, ast) => {
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
      // NOTE BRN: This OrderedMap ensures that the function map is iterated in
      // a deterministic way. Since this map is used to make minifications, it
      // ensures that the minifications always happen in the same order which
      // can make debugging a lot easier.
      OrderedMap()
    ),
    ast
  )
})

export default countFunctionUses
