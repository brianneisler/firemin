import { List } from 'immutable'

import { NodeTypes, OperatorTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import Range from './Range'

describe('Range', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => Range.parse(context, tokenList)).toThrow()
  })

  test('parse returns expected values', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = await tokenize(context, { string: '0:1' })
    const node = Range.parse(context, tokenList)
    expect(node).toEqual({
      children: [
        expect.objectContaining({
          type: NodeTypes.LITERAL,
          value: 0
        }),
        expect.objectContaining({
          operatorType: OperatorTypes.COLON,
          type: NodeTypes.OPERATOR
        }),
        expect.objectContaining({
          type: NodeTypes.LITERAL,
          value: 1
        })
      ],
      end: expect.objectContaining({
        type: NodeTypes.LITERAL,
        value: 1
      }),
      id: expect.any(String),
      start: expect.objectContaining({
        type: NodeTypes.LITERAL,
        value: 0
      }),
      type: NodeTypes.RANGE
    })
  })

  test('is returns true for Range node', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = await tokenize(context, { string: '0:1' })
    const node = Range.parse(context, tokenList)
    expect(Range.is(node)).toBe(true)
  })
})
