import { List } from 'immutable'

import { setupContext } from '../../context'

import DivideOperator from './DivideOperator'

describe('DivideOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => DivideOperator.parse(context, tokenList)).toThrow()
  })
})
