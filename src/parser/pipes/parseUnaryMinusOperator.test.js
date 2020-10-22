import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseUnaryMinusOperator from './parseUnaryMinusOperator'

describe('parseUnaryMinusOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '-' })
    const result = await parseUnaryMinusOperator({
      children,
      context,
      tokenList
    })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.UNARY_MINUS,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.UNARY_MINUS
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
