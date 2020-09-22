import { isObject } from 'lodash'
import { map } from 'ramda'

import { rejectNodes } from '../../ast'
import { NodeTypes } from '../../constants'
import { update } from '../../utils'

const removeFunctionDeclarations = (unusedFunctionIdMap, node) => {
  if (isObject(node.children)) {
    node = rejectNodes(
      (childNode) =>
        childNode.type === NodeTypes.FUNCTION_DECLARATION &&
        unusedFunctionIdMap.has(childNode.id),
      node
    )
    // HACK BRN: This is an ugly hack. This does not take into consideration the
    // references that live on properties such as `body` or any other property
    // of a node. To do this right, we would actually need to write custom
    // manipulation methods for ensuring that the properties get updated as well
    // when these changes are made. OR, we would need to switch the entire AST
    // model to be mutable instead of immutable
    return update(
      'children',
      map((childNode) =>
        removeFunctionDeclarations(unusedFunctionIdMap, childNode)
      ),
      node
    )
  }
  return node
}

export default removeFunctionDeclarations
