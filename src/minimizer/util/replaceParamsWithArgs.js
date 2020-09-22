import { assoc, fromPairs, includes, map, prop, zip } from 'ramda'

import { walkMapTree } from '../../ast'
import { NodeTypes } from '../../constants'

const replaceParamsWithArgs = (statement, params, args) => {
  // get the parameter identifier names
  const paramNames = map(prop('name'), params)
  const paramNamesToArgs = fromPairs(zip(paramNames, args))
  // immutably replace the parameter identifiers with the arguments from the CallExpression
  return walkMapTree(
    (node) => {
      // console.log('node:', node)
      if (node.type === NodeTypes.BINARY_EXPRESSION) {
        if (
          node.left.type === NodeTypes.IDENTIFIER &&
          includes(node.left.name, paramNames)
        ) {
          node = assoc('left', paramNamesToArgs[node.left.name], node)
        }
        if (
          node.right.type === NodeTypes.IDENTIFIER &&
          includes(node.right.name, paramNames)
        ) {
          node = assoc('right', paramNamesToArgs[node.right.name], node)
        }
      } else if (node.type === NodeTypes.UNARY_EXPRESSION) {
        if (
          node.argument.type === NodeTypes.IDENTIFIER &&
          includes(node.argument.name, paramNames)
        ) {
          node = assoc('argument', paramNamesToArgs[node.argument.name], node)
        }
      } else if (node.type === NodeTypes.IDENTIFIER) {
        if (includes(node.name, paramNames)) {
          node = paramNamesToArgs[node.name]
        }
      }
      // TODO BRN: Handle other kinds of nodes
      return node
    },
    statement,
    statement
  )
}

export default replaceParamsWithArgs
