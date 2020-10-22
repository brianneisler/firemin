import { head, length, tail } from 'ramda'

import assocNodeChild from './assocNodeChild'
import getNodeChild from './getNodeChild'

const assocNodePath = (context, path, child, node) => {
  const size = length(path)
  if (size === 0) {
    return child
  }
  const part = head(path)
  if (size > 1) {
    const nextNode = getNodeChild(part, node)
    if (!nextNode) {
      throw new Error('nextNode not found - path:', path, ' node:', node)
    }
    // TODO BRN: This might fail if nextNode does not exist. May need to handle
    // that case.
    child = assocNodePath(context, tail(path), child, nextNode)
  }

  return assocNodeChild(context, part, child, node)
}

export default assocNodePath
