import { filterNodesInTree } from 'firetree'
import { concat, reduce } from 'ramda'

import { measure, weakMemoize } from '../../utils'

const getCallExpressionsByNameInScope = measure(
  'getCallExpressionByNameInScope',
  weakMemoize((name, scope) => {
    const containingScopes = filterNodesInTree((node) => {
      // NOTE BRN: If we're not in the top level scope and we discover another
      // function with the same name, then any call expression found would no
      // longer be for the target name
      if (node !== scope && node.functions[name]) {
        return Symbol.for('break')
      }
      return !!node.calls[name]
    }, scope)

    return reduce(
      (acc, containingScope) => {
        if (containingScope.calls[name]) {
          return concat(acc, containingScope.calls[name])
        }
        return acc
      },
      [],
      containingScopes
    )
  })
)

export default getCallExpressionsByNameInScope
