import { List } from 'immutable'

import { setupContext } from '../../context'

import IsOperator from './IsOperator'

describe('IsOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => IsOperator.parse(context, tokenList)).toThrow()
  })
})
