import { List } from 'immutable'

import { setupContext } from '../../context'

import AmpersandOperator from './AmpersandOperator'

describe('AmpersandOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AmpersandOperator.parse(context, tokenList)).toThrow()
  })
})
