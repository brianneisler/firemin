import { pipe } from 'ramda'

import { collapseSingleUseFunctions, removeUnusedFunctions } from './pipes'

const minimizeAST = async (context, ast) => {
  return pipe(collapseSingleUseFunctions, removeUnusedFunctions)(ast)
}

export default minimizeAST
