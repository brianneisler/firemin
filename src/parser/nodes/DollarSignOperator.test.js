import { List } from 'immutable'

import { setupContext } from '../../context'

import DollarSignOperator from './DollarSignOperator'

describe('DollarSignOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => DollarSignOperator.parse(context, tokenList)).toThrow()
  })
})
