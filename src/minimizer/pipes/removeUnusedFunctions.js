import { curry } from 'ramda'

import { findUnusedFunctions, removeFunctionDeclarations } from '../util'

const removeUnusedFunctions = curry((scopes, ast) => {
  const unusedFunctionIdMap = findUnusedFunctions(scopes, ast)
  return removeFunctionDeclarations(unusedFunctionIdMap, ast)
})

export default removeUnusedFunctions
