import { List } from 'immutable'

import { setupContext } from '../../context'

import OpenBracketOperator from './OpenBracketOperator'

describe('OpenBracketOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => OpenBracketOperator.parse(context, tokenList)).toThrow()
  })
})
