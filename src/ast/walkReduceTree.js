import { isArray, isObject } from 'lodash'
import { addIndex, concat, curry, forEach, forEachObjIndexed } from 'ramda'

import { walk } from '../utils'

const forEachIndexed = addIndex(forEach)

const forEachAny = (iteratee, value) => {
  if (isArray(value)) {
    return forEachIndexed(iteratee, value)
  }
  return forEachObjIndexed(iteratee, value)
}

const reduceWalkee = (accum, node, keys, iteratee, recur) => {
  let result = iteratee(accum, node, keys)
  const { children } = node
  if (isObject(children)) {
    forEachAny((child, childKdx) => {
      const newKeys = concat(keys, [childKdx])
      result = recur(result, child, newKeys, iteratee)
    }, children)
  }
  return result
}

const walkReduceTree = curry((iteratee, accum, tree) =>
  walk(reduceWalkee, accum, tree, [], iteratee)
)

export default walkReduceTree
