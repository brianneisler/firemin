import { List } from 'immutable'
import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import parseModulusOperator from './parseModulusOperator'
import tokenize from '../tokenize'

describe('parseModulusOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
    const tokenList = await tokenize(context, { string: '%' })
    const result = await parseModulusOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.MODULUS,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.MODULUS
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
