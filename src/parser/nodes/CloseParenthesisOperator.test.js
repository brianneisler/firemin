import { List } from 'immutable'

import { setupContext } from '../../context'

import CloseParenthesisOperator from './CloseParenthesisOperator'

describe('CloseParenthesisOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => CloseParenthesisOperator.parse(context, tokenList)).toThrow()
  })
})
