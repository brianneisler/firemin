import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseGreaterThanOperator from './parseGreaterThanOperator'

describe('parseGreaterThanOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '>' })
    const result = await parseGreaterThanOperator({
      children,
      context,
      tokenList
    })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.GREATER_THAN,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.GREATER_THAN
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
