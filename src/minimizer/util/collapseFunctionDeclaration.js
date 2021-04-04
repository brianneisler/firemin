import { NodeTypes, assocNodePath, findNodeInTree, findNodePathInTree } from 'firetree'
import {
  createCloseParenthesisOperator,
  createOpenParenthesisOperator,
  createParenthesesExpression
} from 'firetree/parser/pipes'
import { OperatorCloseParenthesis, OperatorOpenParenthesis } from 'firetree/parser/tokens'
import { List } from 'immutable'
import { propEq, reduce } from 'ramda'

import { measure } from '../../utils'

import getCallExpressionsByNameInScope from './getCallExpressionsByNameInScope'
import replaceParamsWithArgs from './replaceParamsWithArgs'

const replaceCallExpression = measure(
  'replaceCallExpression',
  (context, callExpression, statement, ast) => {
    const callExpressionPath = findNodePathInTree(propEq('id', callExpression.id), ast)

    // TODO BRN: This will not update any node where the callExpression is
    // embedded within an expression
    return assocNodePath(context, callExpressionPath, statement, ast)
  }
)

const collapseFunctionDeclaration = measure(
  (context, ast, functionId) => `collapseFunctionDeclaration:${functionId}`,
  (context, ast, functionId) => {
    const { scopes } = context
    // TODO BRN: Replace this with a lookup by id. Should introduce a function
    // that collapses the tree to a map of ids that can then be used to look up
    // any node in the tree by id
    const functionDeclaration = findNodeInTree(propEq('id', functionId), ast)

    // TODO BRN: Add support for function bodies that are more than one line long
    if (functionDeclaration.body.body.length > 1) {
      return ast
    }
    // console.debug(`collapsing function ${functionDeclaration.identifier.name}`)

    const scope = scopes.get(functionId)
    const callExpressions = getCallExpressionsByNameInScope(
      functionDeclaration.identifier.name,
      scope
    )

    const functionBody = functionDeclaration.body.body[0]
    // console.log('functionDeclaration:', functionDeclaration)

    // Get the statement that will be inserted into the location of the CallExpression
    let statement
    if (functionBody.type === NodeTypes.RETURN_STATEMENT) {
      statement = functionBody.argument
    }

    return reduce(
      (accumAst, callExpression) => {
        let replacedStatement =
          functionDeclaration.params.length > 0
            ? replaceParamsWithArgs(
                context,
                statement,
                functionDeclaration.params,
                callExpression.args
              )
            : statement

        if (replacedStatement.type === NodeTypes.BINARY_EXPRESSION) {
          // TODO BRN: Need a simpler way to do this... maybe a template engine...
          replacedStatement = createParenthesesExpression({
            children: [
              createOpenParenthesisOperator({
                tokenList: List([OperatorOpenParenthesis.parse()])
              }),
              replacedStatement,
              createCloseParenthesisOperator({
                tokenList: List([OperatorCloseParenthesis.parse()])
              })
            ],
            statement: replacedStatement
          })
        }
        // replace CallExpression with statement
        return replaceCallExpression(context, callExpression, replacedStatement, accumAst)
      },
      ast,
      callExpressions
    )
  }
)

export default collapseFunctionDeclaration
