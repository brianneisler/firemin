import { List } from 'immutable'

import { NodeTypes, OperatorTypes, Operators } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import parseModulusOperator from './parseModulusOperator'

describe('parseModulusOperator', () => {
  test('returns expected values', async () => {
    const children = []
    const context = setupContext({ logger: console })
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
