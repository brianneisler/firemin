import { Map } from 'immutable'
import { curry, reduce } from 'ramda'

import { buildScopes, collapseFunctionDeclaration, findFunctionsWithMaxNodeCount } from '../util'

const MAX_NODE_COUNT = 30

const collapseSmallFunctions = curry((context, ast) => {
  const smallExpressionFunctionIdMap = findFunctionsWithMaxNodeCount(ast, MAX_NODE_COUNT)
  return reduce(
    (accum, functionId) =>
      collapseFunctionDeclaration(
        // NOTE BRN: Need to rebuild the scopes after every function collapse
        // since the scopes will have changed as a result of the collapse
        {
          ...context,
          scopes: buildScopes(Map(), null, accum)
        },
        accum,
        functionId
      ),
    ast,
    smallExpressionFunctionIdMap.keys()
  )
})

export default collapseSmallFunctions
