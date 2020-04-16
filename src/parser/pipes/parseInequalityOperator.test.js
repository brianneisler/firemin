import { List } from 'immutable'
import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import parseInequalityOperator from './parseInequalityOperator'
import tokenize from '../tokenize'

describe('parseInequalityOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
    const tokenList = await tokenize(context, { string: '!=' })
    const result = await parseInequalityOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.INEQUALITY,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.INEQUALITY
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
