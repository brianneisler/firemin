import { findNodeInTree } from 'firetree'

import { measure } from '../../utils'

const getCallExpressionByNameInScope = measure('getCallExpressionByNameInScope', (name, scope) => {
  const containingScope = findNodeInTree((node) => {
    // NOTE BRN: If we're not in the top level scope and we discover another
    // function with the same name, then any call expression found would no
    // longer be for the target name
    if (node !== scope && node.functions[name]) {
      return Symbol.for('break')
    }
    return !!node.calls[name]
  }, scope)
  if (containingScope) {
    return containingScope.calls[name]
  }
})

export default getCallExpressionByNameInScope
