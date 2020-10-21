import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseEqualityOperator from './parseEqualityOperator'

describe('parseEqualityOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '==' })
    const result = await parseEqualityOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.EQUALITY,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.EQUALITY
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
