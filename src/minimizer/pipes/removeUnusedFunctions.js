import { Map } from 'immutable'

import {
  buildScopes,
  findUnusedFunctions,
  removeFunctionDeclarations
} from '../util'

const removeUnusedFunctions = (ast) => {
  const unusedFunctionIdMap = findUnusedFunctions(
    buildScopes(Map(), null, ast),
    ast
  )
  return removeFunctionDeclarations(unusedFunctionIdMap, ast)
}

export default removeUnusedFunctions
