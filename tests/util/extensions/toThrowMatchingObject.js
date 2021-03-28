function toThrowMatchingObject(func, expected) {
  const options = {
    comment: 'Expects the function to throw an value that matches the given object',
    isNot: this.isNot,
    promise: this.promise
  }

  let pass = true
  let received

  try {
    func()
  } catch (thrown) {
    received = thrown
  }
  if (received) {
    expect(received).toMatchObject(expected)
  } else {
    pass = false
  }

  const message = pass
    ? () =>
        this.utils.matcherHint('toThrowMatchingObject', undefined, undefined, options) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(received)}`
    : () =>
        this.utils.matcherHint('toThrowMatchingObject', undefined, undefined, options) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        'Received function did not throw'
  return {
    actual: received,
    message,
    pass
  }
}

export default toThrowMatchingObject
