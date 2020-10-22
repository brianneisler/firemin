import { List } from 'immutable'

import { setupContext } from '../../context'
import { createComment } from '../pipes'
import { Comment as CommentToken } from '../tokens'

import Comment from './Comment'

describe('Comment', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => Comment.parse(context, tokenList)).toThrow()
  })

  test('is returns true for Comment node', () => {
    const context = setupContext({
      logger: console
    })
    const node = createComment({
      tokenList: List([CommentToken.parse(context, '// foo\n')])
    })
    expect(Comment.is(node)).toBe(true)
  })
})
