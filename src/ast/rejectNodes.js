import { reject } from 'ramda'

import { NodeTypes } from '../constants'
import { update } from '../utils'

const rejectNodes = (predicate, node) => {
  node = update('children', reject(predicate), node)
  if (
    node.type === NodeTypes.PROGRAM ||
    node.type === NodeTypes.BLOCK_STATEMENT ||
    node.type === NodeTypes.MATCH_STATEMENT
  ) {
    node = update('body', reject(predicate), node)
  }
  return node
}

export default rejectNodes
