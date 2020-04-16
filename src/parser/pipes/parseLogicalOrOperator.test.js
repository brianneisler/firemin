import { List } from 'immutable'
import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import parseLogicalOrOperator from './parseLogicalOrOperator'
import tokenize from '../tokenize'

describe('parseLogicalOrOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
    const tokenList = await tokenize(context, { string: '||' })
    const result = await parseLogicalOrOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.LOGICAL_OR,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.LOGICAL_OR
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
