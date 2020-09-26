import { propEq } from 'ramda'

import { assocNodePath, findNodeInTree, findNodePathInTree } from '../../ast'
import { NodeTypes } from '../../constants'

import getCallExpressionByNameInScope from './getCallExpressionByNameInScope'
import replaceParamsWithArgs from './replaceParamsWithArgs'

const collapseFunctionDeclaration = (context, ast, functionId) => {
  const { scopes } = context
  const functionDeclaration = findNodeInTree(propEq('id', functionId), ast)

  // TODO BRN: Add support for function bodies that are more than one line long
  if (functionDeclaration.body.body.length > 1) {
    return ast
  }
  const scope = scopes.get(functionId)
  const callExpression = getCallExpressionByNameInScope(
    functionDeclaration.identifier.name,
    scope
  )
  console.log('callExpression:', callExpression)

  const functionBody = functionDeclaration.body.body[0]
  // console.log('functionDeclaration:', functionDeclaration)

  // Get the statement that will be inserted into the location of the CallExpression
  let statement
  if (functionBody.type === NodeTypes.RETURN_STATEMENT) {
    statement = functionBody.argument
  }

  if (functionDeclaration.params.length > 0) {
    statement = replaceParamsWithArgs(
      context,
      statement,
      functionDeclaration.params,
      callExpression.args
    )
  }

  console.log('statement:', statement)

  // replace CallExpression with statement
  const callExpressionPath = findNodePathInTree(
    propEq('id', callExpression.id),
    ast
  )

  console.log('callExpressionPath:', callExpressionPath)

  // TODO BRN: This will not update any node where the callExpression is
  // embedded within an expression
  return assocNodePath(context, callExpressionPath, statement, ast)
}

export default collapseFunctionDeclaration
