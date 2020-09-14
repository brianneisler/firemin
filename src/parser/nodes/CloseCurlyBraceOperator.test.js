import { List } from 'immutable'

import { setupContext } from '../../context'

import CloseCurlyBraceOperator from './CloseCurlyBraceOperator'

describe('CloseCurlyBraceOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => CloseCurlyBraceOperator.parse(context, tokenList)).toThrow()
  })
})
