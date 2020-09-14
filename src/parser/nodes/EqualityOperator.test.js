import { List } from 'immutable'

import { setupContext } from '../../context'

import EqualityOperator from './EqualityOperator'

describe('EqualityOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => EqualityOperator.parse(context, tokenList)).toThrow()
  })
})
