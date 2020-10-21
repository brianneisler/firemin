import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseLessThanEqualOperator from './parseLessThanEqualOperator'

describe('parseLessThanEqualOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '<=' })
    const result = await parseLessThanEqualOperator({
      children,
      context,
      tokenList
    })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.LESS_THAN_EQUAL,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.LESS_THAN_EQUAL
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
