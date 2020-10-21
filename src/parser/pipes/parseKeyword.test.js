import { List } from 'immutable'

import { Keywords, NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseKeyword from './parseKeyword'

describe('parseKeyword', () => {
  test('parses an "if" keyword', async () => {
    const children = []
    const context = setupContext({
      logger: console
    })
    const tokenList = await tokenize(context, { string: 'if' })
    const result = await parseKeyword({ children, context, tokenList })

    const keyword = {
      id: expect.any(String),
      name: Keywords.IF,
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
