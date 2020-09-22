import update from './update'

describe('update', () => {
  test('immutably updates a property of an object', async () => {
    const object = { a: 1, b: 2 }
    const result = update('c', () => 3, object)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
    expect(result).not.toBe(object)
    expect(object).toEqual({ a: 1, b: 2 })
  })

  test('update returns the same object if the property value has not changed', async () => {
    const object = { a: 1, b: 2, c: 3 }
    const result = update('c', () => 3, object)
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
    expect(object).toBe(result)
  })
})
