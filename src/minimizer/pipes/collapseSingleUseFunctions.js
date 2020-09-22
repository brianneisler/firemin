import { Map } from 'immutable'
import { reduce } from 'ramda'

import {
  buildScopes,
  collapseFunctionDeclaration,
  findSingleUseFunctions
} from '../util'

const collapseSingleUseFunctions = (ast) => {
  const singleUseFunctionIdMap = findSingleUseFunctions(
    buildScopes(Map(), null, ast),
    ast
  )
  return reduce(
    (accum, functionId) =>
      collapseFunctionDeclaration(
        // NOTE BRN: Need to rebuild the scopes after every
        buildScopes(Map(), null, accum),
        accum,
        functionId
      ),
    ast,
    singleUseFunctionIdMap.keys()
  )
}

export default collapseSingleUseFunctions
