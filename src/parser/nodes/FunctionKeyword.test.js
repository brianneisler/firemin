import { List } from 'immutable'

import { setupContext } from '../../context'
import { createFunctionKeyword } from '../pipes'
import { KeywordFunction } from '../tokens'

import FunctionKeyword from './FunctionKeyword'

describe('FunctionKeyword', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => FunctionKeyword.parse(context, tokenList)).toThrow()
  })

  test('is returns true for FunctionKeyword node', () => {
    const allowKeyword = createFunctionKeyword({
      tokenList: List([KeywordFunction.parse()])
    })
    expect(FunctionKeyword.is(allowKeyword)).toBe(true)
  })
})
