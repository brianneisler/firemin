import { fromPairs, has, init, map, prop, zip } from 'ramda'

import { getNodePath, walkMapTree } from '../../ast'
import { NodeTypes } from '../../constants'
import { measure } from '../../utils'

const isValidReplacementTarget = (node, keys, tree) => {
  const parent = getNodePath(init(keys), tree)
  if (parent.type === NodeTypes.LET_DECLARATION) {
    if (parent.identifier === node) {
      return false
    }
  } else if (parent.type === NodeTypes.STATIC_MEMBER_EXPRESSION) {
    if (parent.property === node) {
      return false
    }
  }
  return true
}

const replaceParamsWithArgs = measure(
  'replaceParamsWithArgs',
  (context, statement, params, args) => {
    // get the parameter identifier names
    const paramNames = map(prop('name'), params)
    // NOTE BRN: If there is a mismatch between number of params and number of
    // args then this will drop to the minimum set that exists in both. This
    // prevents replacing param names with undefined args.
    const paramNamesToArgs = fromPairs(zip(paramNames, args))
    // immutably replace the parameter identifiers with the arguments from the CallExpression
    return walkMapTree(
      context,
      (node, keys, tree) => {
        // NOTE BRN: With the new `identify` system we shouldn't have to make
        // these kinds of changes anymore since these values will automatically be
        // regenerated anytime the children are changed

        if (node.type === NodeTypes.IDENTIFIER) {
          if (
            has(node.name, paramNamesToArgs) &&
            isValidReplacementTarget(node, keys, tree)
          ) {
            return paramNamesToArgs[node.name]
          }
        }
        return node
      },
      statement,
      statement
    )
  }
)

export default replaceParamsWithArgs
