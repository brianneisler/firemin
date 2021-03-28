import { NodeTypes } from 'firetree'
import { isObject } from 'lodash'
import { reduce } from 'ramda'

import { measure } from '../../utils'

import newScope from './newScope'

// TODO BRN: Rework this to first build the tree structure of the scopes and
// then to generate the flattened map of every scope. This will allow for each
// scope to be generated in an immutable way and will allow for memoization of
// the generation of each scope

// - build the scope tree depth first. This way we can memoize
const buildScopes = (scopes, currentScope, node) => {
  if (node.type === NodeTypes.PROGRAM || node.type === NodeTypes.BLOCK_STATEMENT) {
    currentScope = newScope(currentScope)
  }
  // NOTE BRN: Record all functions by name
  if (node.type === NodeTypes.FUNCTION_DECLARATION) {
    // HACK BRN: Mutable change. Rework this to be immutable
    currentScope.functions[node.identifier.name] = node
  }
  if (node.type === NodeTypes.CALL_EXPRESSION) {
    currentScope.calls[node.callee.name] = node
  }
  scopes = scopes.set(node.id, currentScope)
  const { children } = node
  if (isObject(children)) {
    return reduce(
      (accum, childNode) => buildScopes(accum, currentScope, childNode),
      scopes,
      children
    )
  }
  return scopes
}

export default measure('buildScopes', buildScopes)
