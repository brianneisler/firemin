import { List } from 'immutable'

import { setupContext } from '../../context'

import LessThanOperator from './LessThanOperator'

describe('LessThanOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => LessThanOperator.parse(context, tokenList)).toThrow()
  })
})
