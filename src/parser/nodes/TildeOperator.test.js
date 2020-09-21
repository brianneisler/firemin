import { List } from 'immutable'

import { setupContext } from '../../context'

import TildeOperator from './TildeOperator'

describe('TildeOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => TildeOperator.parse(context, tokenList)).toThrow()
  })
})
