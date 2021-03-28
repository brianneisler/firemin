import { NodeTypes, identifyNode, rejectNodes } from 'firetree'
import { isObject } from 'lodash'
import { map, pipe } from 'ramda'

import { update } from '../../utils'

const removeFunctionDeclarations = (context, unusedFunctionIdMap, node) => {
  if (isObject(node.children)) {
    return pipe(
      rejectNodes(
        context,
        (childNode) =>
          childNode.type === NodeTypes.FUNCTION_DECLARATION && unusedFunctionIdMap.has(childNode.id)
      ),
      update(
        'children',
        map((childNode) => removeFunctionDeclarations(context, unusedFunctionIdMap, childNode))
      ),
      identifyNode(context)
    )(node)
  }
  return node
}

export default removeFunctionDeclarations
