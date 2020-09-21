import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import tokenize from '../tokenize'

import parseMultiplyOperator from './parseMultiplyOperator'

describe('parseMultiplyOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
    const tokenList = await tokenize(context, { string: '*' })
    const result = await parseMultiplyOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.MULTIPLY,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.MULTIPLY
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
