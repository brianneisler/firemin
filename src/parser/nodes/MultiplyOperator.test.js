import { List } from 'immutable'

import { setupContext } from '../../context'

import MultiplyOperator from './MultiplyOperator'

describe('MultiplyOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => MultiplyOperator.parse(context, tokenList)).toThrow()
  })
})
