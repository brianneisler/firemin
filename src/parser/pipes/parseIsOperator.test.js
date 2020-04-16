import { Keywords, NodeTypes } from '../../constants'
import { List } from 'immutable'
import parseIsOperator from './parseIsOperator'
import tokenize from '../tokenize'

describe('parseIsOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
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
