import { List } from 'immutable'

import { Keywords, NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseLetKeyword from './parseLetKeyword'

describe('parseLetKeyword', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'let' })
    const result = await parseLetKeyword({ children, context, tokenList })

    const keyword = {
      id: expect.any(String),
      name: Keywords.LET,
      tokenList,
      type: NodeTypes.KEYWORD
    }

    expect(result).toEqual({
      children: [keyword],
      context,
      keyword,
      tokenList: List()
    })
  })
})
