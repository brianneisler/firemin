import { List } from 'immutable'

import { Keywords, NodeTypes, OperatorTypes } from '../../constants'
import { setupContext } from '../../context'
import tokenize from '../tokenize'

import LetDeclaration from './LetDeclaration'

describe('LetDeclaration', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => LetDeclaration.parse(context, tokenList)).toThrow()
  })

  test('parse returns expected values', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = await tokenize(context, { string: 'let foo = true;' })
    const node = LetDeclaration.parse(context, tokenList)
    expect(node).toEqual({
      children: [
        expect.objectContaining({
          name: Keywords.LET,
          type: NodeTypes.KEYWORD
        }),
        expect.objectContaining({
          type: NodeTypes.WHITESPACE
        }),
        expect.objectContaining({
          name: 'foo',
          type: NodeTypes.IDENTIFIER
        }),
        expect.objectContaining({
          type: NodeTypes.WHITESPACE
        }),
        expect.objectContaining({
          operatorType: OperatorTypes.ASSIGNMENT,
          type: NodeTypes.OPERATOR
        }),
        expect.objectContaining({
          type: NodeTypes.WHITESPACE
        }),
        expect.objectContaining({
          name: 'true',
          type: NodeTypes.IDENTIFIER
        }),
        expect.objectContaining({
          operatorType: OperatorTypes.SEMICOLON,
          type: NodeTypes.OPERATOR
        })
      ],
      id: expect.any(String),
      identifier: expect.objectContaining({
        name: 'foo',
        type: NodeTypes.IDENTIFIER
      }),
      init: expect.objectContaining({
        name: 'true',
        type: NodeTypes.IDENTIFIER
      }),
      operator: expect.objectContaining({
        operatorType: OperatorTypes.ASSIGNMENT,
        type: NodeTypes.OPERATOR
      }),
      type: NodeTypes.LET_DECLARATION
    })
  })

  test('is returns true for LetDeclaration node', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = await tokenize(context, { string: 'let foo = true;' })
    const node = LetDeclaration.parse(context, tokenList)
    expect(LetDeclaration.is(node)).toBe(true)
  })
})
