import { List } from 'immutable'

import { setupContext } from '../../context'

import CommaOperator from './CommaOperator'

describe('CommaOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => CommaOperator.parse(context, tokenList)).toThrow()
  })
})
