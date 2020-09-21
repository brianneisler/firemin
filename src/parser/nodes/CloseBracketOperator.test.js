import { List } from 'immutable'

import { setupContext } from '../../context'

import CloseBracketOperator from './CloseBracketOperator'

describe('CloseBracketOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => CloseBracketOperator.parse(context, tokenList)).toThrow()
  })
})
