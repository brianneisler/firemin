import { List } from 'immutable'
import { NodeTypes, OperatorTypes } from '../constants'
import generateString from '../generator/generateString'
import parseString from './parseString'

describe('parseString', () => {
  test('parse a simple AssignmentExpression to AST', async () => {
    const context = { logger: console }
    const result = await parseString(context, 'a = b;')
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

  test('parses a double StaticMemberExpression to AST', async () => {
    const code = 'a.b.c;'
    const context = { logger: console }
    const result = await parseString(context, code)
    expect(result).toEqual({
      body: [
        {
          children: expect.any(Array),
          expression: {
            children: expect.any(Array),
            object: {
              children: expect.any(Array),
              object: {
                name: 'a',
                tokenList: expect.any(List),
                type: NodeTypes.IDENTIFIER
              },
              property: {
                name: 'b',
                tokenList: expect.any(List),
                type: NodeTypes.IDENTIFIER
              },
              type: NodeTypes.STATIC_MEMBER_EXPRESSION
            },
            property: {
              name: 'c',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            type: NodeTypes.STATIC_MEMBER_EXPRESSION
          },
          type: NodeTypes.EXPRESSION_STATEMENT
        }
      ],
      children: expect.any(Array),
      type: NodeTypes.PROGRAM
    })
  })

  test('parses a simple true boolean Literal', async () => {
    const code = 'true;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple false boolean Literal', async () => {
    const code = 'false;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple number Literal', async () => {
    const code = '123;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple single quote string Literal', async () => {
    const code = "'abc';"
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple double quote string Literal', async () => {
    const code = '"abc";'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple Identifier', async () => {
    const code = 'a;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "+"', async () => {
    const code = '+a;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "-"', async () => {
    const code = '-a;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "!"', async () => {
    const code = '!a;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple AssignmentExpression', async () => {
    const code = 'a = b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a + b"', async () => {
    const code = 'a + b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a - b"', async () => {
    const code = 'a - b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a / b"', async () => {
    const code = 'a / b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a * b"', async () => {
    const code = 'a * b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a % b"', async () => {
    const code = 'a % b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a == b"', async () => {
    const code = 'a == b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a != b"', async () => {
    const code = 'a != b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a > b"', async () => {
    const code = 'a > b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a >= b"', async () => {
    const code = 'a >= b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a < b"', async () => {
    const code = 'a < b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a <= b"', async () => {
    const code = 'a <= b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a && b"', async () => {
    const code = 'a && b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a || b"', async () => {
    const code = 'a || b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple CallExpression "foo()"', async () => {
    const code = 'foo();'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple CallExpression with one argument "foo(\'bar\')"', async () => {
    const code = 'foo();'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple CallExpression with two arguments "foo(\'bar\', 123)"', async () => {
    const code = 'foo();'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ComputedMemberExpression', async () => {
    const code = 'a["b"];'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a double ComputedMemberExpression', async () => {
    const code = 'a["b"]["c"];'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple StaticMemberExpression', async () => {
    const code = 'a.b;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a double StaticMemberExpression', async () => {
    const code = 'a.b.c;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a multi StaticMemberExpression', async () => {
    const code = 'a.b.c.d.e;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple FunctionDeclaration', async () => {
    const code = 'function foo() {}'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a FunctionDeclaration with a ReturnStatement', async () => {
    const code = 'function foo() { return "foo" }'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an IfStatement "if true;"', async () => {
    const code = 'if true;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an IfStatement "if foo;"', async () => {
    const code = 'if foo;'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an IfStatement "if foo() && bar();"', async () => {
    const code = 'if foo() && bar();'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an empty ListExpression "[];"', async () => {
    const code = '[];'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ListExpression "[\'foo\'];"', async () => {
    const code = "['foo'];"
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a ListExpression "[ true, \'foo\', bar() ];"', async () => {
    const code = "[ true, 'foo', bar() ];"
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an empty MapExpression "{};"', async () => {
    const code = '{};'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple MapExpression "{ \'foo\': bar };"', async () => {
    const code = "{ 'foo': bar };"
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test("parses a MapExpression \"{ 'a': true, 'b':'foo', 'c':bar() };\"", async () => {
    const code = "{ 'a': true, 'b':'foo', 'c':bar() };"
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ServiceStatement', async () => {
    const code = 'service cloud.firestore {}'
    const context = { logger: console }
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })
})
