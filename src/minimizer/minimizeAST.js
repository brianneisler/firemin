import { pipe } from 'ramda'

import { collapseSingleUseFunctions, removeUnusedFunctions } from './pipes'

const minimizeAST = async (context, ast) => {
  return pipe(collapseSingleUseFunctions(context), removeUnusedFunctions(context))(ast)
}

export default minimizeAST
