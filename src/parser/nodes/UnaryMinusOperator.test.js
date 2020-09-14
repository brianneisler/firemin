import { List } from 'immutable'

import { setupContext } from '../../context'

import UnaryMinusOperator from './UnaryMinusOperator'

describe('UnaryMinusOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => UnaryMinusOperator.parse(context, tokenList)).toThrow()
  })
})
