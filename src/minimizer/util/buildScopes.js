import { NodeTypes } from '../../constants'
import { isObject } from 'lodash'
import { reduce } from 'ramda'
import newScope from './newScope'

const buildScopes = (scopes, currentScope, node) => {
  if (node.type === NodeTypes.PROGRAM || node.type === NodeTypes.BLOCK_STATEMENT) {
    currentScope = newScope(currentScope)
  }
  // NOTE BRN: Record all functions by name
  if (node.type === NodeTypes.FUNCTION_DECLARATION) {
    // HACK BRN: Mutable change. Rework this to be immutable
    currentScope.functions[node.identifier.name] = node
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

export default buildScopes
