import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseBackwardSlashOperator from './parseBackwardSlashOperator'

describe('parseBackwardSlashOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
    const tokenList = await tokenize(context, { string: '\\' })
    const result = await parseBackwardSlashOperator({
      children,
      context,
      tokenList
    })

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
