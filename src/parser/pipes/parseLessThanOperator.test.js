import { List } from 'immutable'
import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import parseLessThanOperator from './parseLessThanOperator'
import tokenize from '../tokenize'

describe('parseLessThanOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
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
