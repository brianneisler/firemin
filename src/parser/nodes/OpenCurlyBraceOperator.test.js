import { List } from 'immutable'

import { setupContext } from '../../context'

import OpenCurlyBraceOperator from './OpenCurlyBraceOperator'

describe('OpenCurlyBraceOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => OpenCurlyBraceOperator.parse(context, tokenList)).toThrow()
  })
})
