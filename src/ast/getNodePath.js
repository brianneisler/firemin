import { isUndefined } from 'lodash'
import { length } from 'ramda'

import getNodeChild from './getNodeChild'

const getNodePath = (path, node) => {
  let val = node
  let idx = 0
  const size = length(path)
  while (idx < size) {
    val = getNodeChild(path[idx], val)
    if (isUndefined(val)) {
      return val
    }
    idx += 1
  }
  return val
}

export default getNodePath
