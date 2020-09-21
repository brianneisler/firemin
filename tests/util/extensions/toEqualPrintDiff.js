import { keys, omit } from 'ramda'

function toEqualPrintDiff(received, expecteds) {
  const options = {
    comment:
      'Checks for a value equality between two objects and prints a usable diff',
    isNot: this.isNot,
    promise: this.promise
  }

  const expectedProps = keys(expecteds)
  const foundProps = []
  expectedProps.forEach((expectedProp) => {
    const expected = expecteds[expectedProp]
    expect(received).toHaveProperty(expectedProp, expected)
    foundProps.push(expectedProp)
  })

  const remainingProps = keys(omit(foundProps, received))
  const pass = remainingProps.length === 0
  const message = pass
    ? () =>
        this.utils.matcherHint(
          'toHaveReturnedTruthyForValues',
          undefined,
          undefined,
          options
        ) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expecteds)}\n` +
        `Received: ${this.utils.printReceived(received)}`
    : () =>
        this.utils.matcherHint('toBe', undefined, undefined, options) +
        '\n\n' +
        `Expected: ${this.utils.printExpected(expecteds)}\n` +
        `Received: ${this.utils.printReceived(received)}\n` +
        `Difference: Object contains the following unexpected properties ['${remainingProps.join(
          "', '"
        )}']`

  return {
    actual: received,
    message,
    pass
  }
}

export default toEqualPrintDiff
