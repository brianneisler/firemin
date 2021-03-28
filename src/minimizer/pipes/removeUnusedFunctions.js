import { Map } from 'immutable'
import { curry } from 'ramda'

import { buildScopes, findUnusedFunctions, removeFunctionDeclarations } from '../util'

const removeUnusedFunctions = curry((context, ast) => {
  const unusedFunctionIdMap = findUnusedFunctions(
    {
      ...context,
      scopes: buildScopes(Map(), null, ast)
    },
    ast
  )
  return removeFunctionDeclarations(context, unusedFunctionIdMap, ast)
})

export default removeUnusedFunctions
