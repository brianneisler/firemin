import { Map } from 'immutable'
import { buildScopes } from './util'
import { pipe } from 'ramda'
import { removeUnusedFunctions } from './pipes'

const minimizeAST = async (context, ast) => {
  const scopes = buildScopes(Map(), null, ast)
  return pipe(removeUnusedFunctions(scopes))(ast)
}

export default minimizeAST
