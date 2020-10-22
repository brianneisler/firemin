import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseUnaryPlusOperator from './parseUnaryPlusOperator'

describe('parseUnaryPlusOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '+' })
    const result = await parseUnaryPlusOperator({
      children,
      context,
      tokenList
    })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.UNARY_PLUS,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.UNARY_PLUS
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
