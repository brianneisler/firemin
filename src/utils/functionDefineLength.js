const wrapFunctionArity = (fn, n) => {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments)
      }
    case 1:
      return function (a0) {
        return fn.apply(this, arguments)
      }
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments)
      }
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments)
      }
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments)
      }
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments)
      }
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments)
      }
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments)
      }
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments)
      }
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments)
      }
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments)
      }
    default:
      throw new Error(
        'First argument to wrapFunctionArity must be a non-negative integer no greater than ten'
      )
  }
}

/**
 * Defines `length` for the given `func`
 *
 * Note: This mutates `func`
 *
 * @private
 * @function
 * @since v0.1.0
 * @category lang.util
 * @param {Function} func The function to define the length of.
 * @param {Number} length The length of the function parameters.
 * @return {Function} The `func` function.
 * @example
 *
 * const result = functionDefineLength(function(abc) {}, 2)
 * result.length
 * //=> 2
 */
const functionDefineLength = (func, length) => {
  const descriptor = Object.getOwnPropertyDescriptor(func, 'length')
  if (descriptor.configurable) {
    Object.defineProperty(func, 'length', {
      configurable: true,
      value: length
    })
    return func
  }
  return wrapFunctionArity(func, length)
}

export default functionDefineLength
