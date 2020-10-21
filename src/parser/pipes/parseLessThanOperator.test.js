import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseLessThanOperator from './parseLessThanOperator'

describe('parseLessThanOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '<' })
    const result = await parseLessThanOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.LESS_THAN,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.LESS_THAN
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
