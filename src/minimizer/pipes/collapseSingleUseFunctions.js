import { Map } from 'immutable'
import { curry, reduce } from 'ramda'

import { buildScopes, collapseFunctionDeclaration, findSingleUseFunctions } from '../util'

const collapseSingleUseFunctions = curry((context, ast) => {
  context = {
    ...context,
    scopes: buildScopes(Map(), null, ast)
  }

  const singleUseFunctionIdMap = findSingleUseFunctions(context, ast)
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
    singleUseFunctionIdMap.keys()
  )
})

export default collapseSingleUseFunctions
