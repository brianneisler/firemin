import { pipe } from 'ramda'

import { collapseSingleUseFunctions, collapseSmallFunctions, removeUnusedFunctions } from './pipes'

const minimizeAST = async (context, ast) => {
  return pipe(
    collapseSingleUseFunctions(context),
    collapseSmallFunctions(context),
    removeUnusedFunctions(context)
  )(ast)
}

export default minimizeAST
