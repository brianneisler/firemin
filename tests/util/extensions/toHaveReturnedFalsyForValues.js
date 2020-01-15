function toHaveReturnedFalsyForValues(func, values) {
  const options = {
    comment: 'Checks for a return of `false` from multiple values',
    isNot: this.isNot,
    promise: this.promise
  }

  let idx = 0
  let pass = true
  let received
  let value
  const expected = false
  while (idx < values.length && pass) {
    value = values[idx]
    received = func(value)
    pass = received === expected
    idx += 1
  }

  const message = () =>
    this.utils.matcherHint('toHaveReturnedTruthyForValues', func, `[${value}]`, options) +
    '\n\n' +
    `Expected: ${this.utils.printExpected(expected)}\n` +
    `Received: ${this.utils.printReceived(received)}`

  return {
    actual: received,
    message,
    pass
  }
}

export default toHaveReturnedFalsyForValues
