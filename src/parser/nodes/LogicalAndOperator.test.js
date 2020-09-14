import { List } from 'immutable'

import { setupContext } from '../../context'

import LogicalAndOperator from './LogicalAndOperator'

describe('LogicalAndOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => LogicalAndOperator.parse(context, tokenList)).toThrow()
  })
})
