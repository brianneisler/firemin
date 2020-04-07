import { List } from 'immutable'
import { NodeTypes, OperatorTypes } from '../constants'
import generateString from '../generator/generateString'
import parseString from './parseString'

describe('parseString', () => {
  test('parse a simple AssignmentExpression to AST', async () => {
    const context = { logger: console }
    const result = await parseString(context, 'a = b')
    expect(result).toEqual({
      body: [
        {
          children: expect.any(Array),
          expression: {
            children: expect.any(Array),
            left: {
              name: 'a',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            operator: {
              operatorType: OperatorTypes.ASSIGNMENT,
              tokenList: expect.any(List),
              type: NodeTypes.OPERATOR,
              value: '='
            },
            right: {
              name: 'b',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            type: NodeTypes.ASSIGNMENT_EXPRESSION
          },
          type: NodeTypes.EXPRESSION_STATEMENT
        }
      ],
      children: expect.any(Array),
      type: NodeTypes.PROGRAM
    })
  })

  test('parses a simple true boolean Literal', async () => {
    const code = 'true'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple false boolean Literal', async () => {
    const code = 'false'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple number Literal', async () => {
    const code = '123'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple single quote string Literal', async () => {
    const code = "'abc'"
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple double quote string Literal', async () => {
    const code = '"abc"'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple Identifier', async () => {
    const code = 'a'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "+"', async () => {
    const code = '+a'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "-"', async () => {
    const code = '-a'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "!"', async () => {
    const code = '!a'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a + b"', async () => {
    const code = 'a + b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a - b"', async () => {
    const code = 'a - b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a / b"', async () => {
    const code = 'a / b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a * b"', async () => {
    const code = 'a * b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a % b"', async () => {
    const code = 'a % b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a == b"', async () => {
    const code = 'a == b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a != b"', async () => {
    const code = 'a != b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a > b"', async () => {
    const code = 'a > b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a >= b"', async () => {
    const code = 'a >= b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a < b"', async () => {
    const code = 'a < b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a <= b"', async () => {
    const code = 'a <= b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a && b"', async () => {
    const code = 'a && b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a || b"', async () => {
    const code = 'a || b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple AssignmentExpression', async () => {
    const code = 'a = b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple StaticMemberExpression', async () => {
    const code = 'a.b'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })
})
