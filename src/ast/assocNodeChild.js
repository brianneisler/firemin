import { assocPath, pipe } from 'ramda'

import identifyNode from './identifyNode'

const assocNodeChild = (context, index, child, node) => {
  const propPath = ['children', index]
  return pipe(assocPath(propPath, child), identifyNode(context))(node)
}

export default assocNodeChild
