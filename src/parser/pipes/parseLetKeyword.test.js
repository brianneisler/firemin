import { Keywords, NodeTypes } from '../../constants'
import { List } from 'immutable'
import parseLetKeyword from './parseLetKeyword'
import tokenize from '../tokenize'

describe('parseLetKeyword', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
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
