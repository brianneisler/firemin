import { List } from 'immutable'

import { setupContext } from '../../context'
import { createWord } from '../pipes'
import { OperatorMultiply } from '../tokens'

import Word from './Word'

describe('Word', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => Word.parse(context, tokenList)).toThrow()
  })

  test('is returns true for Whitespace node', () => {
    const node = createWord({
      tokenList: List([OperatorMultiply.parse()])
    })
    expect(Word.is(node)).toBe(true)
  })
})
