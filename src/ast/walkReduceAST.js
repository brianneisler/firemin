import { isObject } from 'lodash'
import { concat, curry, forEach } from 'ramda'

import { walk } from '../utils'

const astReduceWalkee = (accum, node, keys, iteratee, recur) => {
  let result = iteratee(accum, node, keys)
  const { children } = node
  if (isObject(children)) {
    forEach((child, childKdx) => {
      const newKeys = concat(keys, [childKdx])
      result = recur(result, child, newKeys, iteratee)
    }, children)
  }
  return result
}

const walkReduceAST = curry((iteratee, accum, ast) =>
  walk(astReduceWalkee, accum, ast, [], iteratee)
)

export default walkReduceAST
