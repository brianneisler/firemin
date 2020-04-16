import { List } from 'immutable'
import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import parseLogicalNotOperator from './parseLogicalNotOperator'
import tokenize from '../tokenize'

describe('parseLogicalNotOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
    const tokenList = await tokenize(context, { string: '!' })
    const result = await parseLogicalNotOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.LOGICAL_NOT,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.LOGICAL_NOT
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
