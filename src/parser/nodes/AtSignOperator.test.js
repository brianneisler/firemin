import { List } from 'immutable'

import { setupContext } from '../../context'

import AtSignOperator from './AtSignOperator'

describe('AtSignOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AtSignOperator.parse(context, tokenList)).toThrow()
  })
})
