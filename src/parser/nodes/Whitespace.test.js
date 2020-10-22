import { List } from 'immutable'

import { setupContext } from '../../context'
import { createWhitespace } from '../pipes'
import { Whitespace as WhitespaceToken } from '../tokens'

import Whitespace from './Whitespace'

describe('Whitespace', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => Whitespace.parse(context, tokenList)).toThrow()
  })

  test('is returns true for Whitespace node', () => {
    const context = setupContext({
      logger: console
    })
    const node = createWhitespace({
      tokenList: List([WhitespaceToken.parse(context, '  ')])
    })
    expect(Whitespace.is(node)).toBe(true)
  })
})
