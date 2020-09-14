import { List } from 'immutable'

import { setupContext } from '../../context'

import LogicalOrOperator from './LogicalOrOperator'

describe('LogicalOrOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => LogicalOrOperator.parse(context, tokenList)).toThrow()
  })
})
