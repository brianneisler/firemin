import { fromPairs, includes, map, prop, zip } from 'ramda'

import { walkMapTree } from '../../ast'
import { NodeTypes } from '../../constants'

const replaceParamsWithArgs = (context, statement, params, args) => {
  // get the parameter identifier names
  const paramNames = map(prop('name'), params)
  const paramNamesToArgs = fromPairs(zip(paramNames, args))
  // immutably replace the parameter identifiers with the arguments from the CallExpression
  return walkMapTree(
    context,
    (node) => {
      // NOTE BRN: With the new `identify` system we shouldn't have to make
      // these kinds of changes anymore since these values will automatically be
      // regenerated anytime the children are changed

      // if (node.type === NodeTypes.BINARY_EXPRESSION) {
      //   if (
      //     node.left.type === NodeTypes.IDENTIFIER &&
      //     includes(node.left.name, paramNames)
      //   ) {
      //     node = assoc('left', paramNamesToArgs[node.left.name], node)
      //   }
      //   if (
      //     node.right.type === NodeTypes.IDENTIFIER &&
      //     includes(node.right.name, paramNames)
      //   ) {
      //     node = assoc('right', paramNamesToArgs[node.right.name], node)
      //   }
      // } else if (node.type === NodeTypes.UNARY_EXPRESSION) {
      //   if (
      //     node.argument.type === NodeTypes.IDENTIFIER &&
      //     includes(node.argument.name, paramNames)
      //   ) {
      //     node = assoc('argument', paramNamesToArgs[node.argument.name], node)
      //   }
      // } else
      if (node.type === NodeTypes.IDENTIFIER) {
        if (includes(node.name, paramNames)) {
          return paramNamesToArgs[node.name]
        }
      }
      return node
    },
    statement,
    statement
  )
}

export default replaceParamsWithArgs
