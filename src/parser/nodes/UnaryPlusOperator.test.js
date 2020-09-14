import { List } from 'immutable'

import { setupContext } from '../../context'

import UnaryPlusOperator from './UnaryPlusOperator'

describe('UnaryPlusOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => UnaryPlusOperator.parse(context, tokenList)).toThrow()
  })
})
