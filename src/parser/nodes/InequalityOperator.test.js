import { List } from 'immutable'

import { setupContext } from '../../context'

import InequalityOperator from './InequalityOperator'

describe('InequalityOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => InequalityOperator.parse(context, tokenList)).toThrow()
  })
})
