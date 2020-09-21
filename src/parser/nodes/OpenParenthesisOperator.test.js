import { List } from 'immutable'

import { setupContext } from '../../context'

import OpenParenthesisOperator from './OpenParenthesisOperator'

describe('OpenParenthesisOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => OpenParenthesisOperator.parse(context, tokenList)).toThrow()
  })
})
