import { List } from 'immutable'

import { setupContext } from '../../context'

import LogicalNotOperator from './LogicalNotOperator'

describe('LogicalNotOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => LogicalNotOperator.parse(context, tokenList)).toThrow()
  })
})
