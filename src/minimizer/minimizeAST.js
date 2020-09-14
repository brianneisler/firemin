import { Map } from 'immutable'
import { pipe } from 'ramda'

import { removeUnusedFunctions } from './pipes'
import { buildScopes } from './util'

const minimizeAST = async (context, ast) => {
  const scopes = buildScopes(Map(), null, ast)
  return pipe(removeUnusedFunctions(scopes))(ast)
}

export default minimizeAST
