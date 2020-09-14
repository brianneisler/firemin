import { List } from 'immutable'

import { setupContext } from '../../context'

import GreaterThanOperator from './GreaterThanOperator'

describe('GreaterThanOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => GreaterThanOperator.parse(context, tokenList)).toThrow()
  })
})
