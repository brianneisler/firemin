import { List } from 'immutable'

import { Keywords, NodeTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseIsOperator from './parseIsOperator'

describe('parseIsOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: 'is' })
    const result = await parseIsOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      name: Keywords.IS,
      tokenList,
      type: NodeTypes.OPERATOR
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
