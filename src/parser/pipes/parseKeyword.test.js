import { List } from 'immutable'
import { filter, keys, map, values } from 'ramda'

import { Keywords, NodeTypes, ParserTypes } from '../../constants'
import * as Nodes from '../nodes'
import tokenize from '../tokenize'

import parseKeyword from './parseKeyword'

describe('parseKeyword', () => {
  test('parses an "if" keyword', async () => {
    const NodeParsers = map((name) => {
      // eslint-disable-next-line import/namespace
      const NodeParser = Nodes[name]
      NodeParser.name = name
      return NodeParser
    }, keys(Nodes))
    const children = []
    const context = {
      Keywords: filter(
        (parser) => parser.type === ParserTypes.KEYWORD,
        values(NodeParsers)
      ),
      logger: console
    }
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
