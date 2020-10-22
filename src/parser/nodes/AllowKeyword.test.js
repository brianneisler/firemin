import { List } from 'immutable'

import { setupContext } from '../../context'
import { createAllowKeyword } from '../pipes'
import { KeywordAllow } from '../tokens'

import AllowKeyword from './AllowKeyword'

describe('AllowKeyword', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AllowKeyword.parse(context, tokenList)).toThrow()
  })

  test('is returns true for AllowKeyword node', () => {
    const node = createAllowKeyword({
      tokenList: List([KeywordAllow.parse()])
    })
    expect(AllowKeyword.is(node)).toBe(true)
  })
})
