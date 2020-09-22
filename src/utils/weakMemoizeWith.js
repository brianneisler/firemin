import { curryN } from 'ramda'

import functionDefineLength from './functionDefineLength'

const weakMemoizeWith = curryN(2, (mFn, fn) => {
  const cache = new WeakMap()
  return functionDefineLength((...args) => {
    const key = mFn(...args)
    if (!cache.has(key)) {
      const result = fn(...args)
      cache.set(key, result)
      return result
    }
    return cache.get(key)
  }, fn.length)
})

export default weakMemoizeWith
