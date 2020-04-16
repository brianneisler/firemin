import { List } from 'immutable'
import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import parseBackwardSlashOperator from './parseBackwardSlashOperator'
import tokenize from '../tokenize'

describe('parseBackwardSlashOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = { logger: console }
    const tokenList = await tokenize(context, { string: '\\' })
    const result = await parseBackwardSlashOperator({ children, context, tokenList })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.BACKWARD_SLASH,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.BACKWARD_SLASH
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
