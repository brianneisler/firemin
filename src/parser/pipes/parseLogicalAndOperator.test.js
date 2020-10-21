import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseLogicalAndOperator from './parseLogicalAndOperator'

describe('parseLogicalAndOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '&&' })
    const result = await parseLogicalAndOperator({
      children,
      context,
      tokenList
    })

    const operator = {
      id: expect.any(String),
      operatorType: OperatorTypes.LOGICAL_AND,
      tokenList,
      type: NodeTypes.OPERATOR,
      value: Operators.LOGICAL_AND
    }

    expect(result).toEqual({
      children: [operator],
      context,
      operator,
      tokenList: List()
    })
  })
})
