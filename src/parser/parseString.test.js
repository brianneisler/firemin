import { List } from 'immutable'

import { NodeTypes, OperatorTypes } from '../constants'
import { setupContext } from '../context'
import generateString from '../generator/generateString'

import parseString from './parseString'

describe('parseString', () => {
  test('parse a simple AssignmentExpression to AST', async () => {
    const context = setupContext({ logger: console })
    const result = await parseString(context, 'a = b;')
    expect(result).toEqual({
      body: [
        {
          children: expect.any(Array),
          expression: {
            children: expect.any(Array),
            id: expect.any(String),
            left: {
              id: expect.any(String),
              name: 'a',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            operator: {
              id: expect.any(String),
              operatorType: OperatorTypes.ASSIGNMENT,
              tokenList: expect.any(List),
              type: NodeTypes.OPERATOR,
              value: '='
            },
            right: {
              id: expect.any(String),
              name: 'b',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            type: NodeTypes.ASSIGNMENT_EXPRESSION
          },
          id: expect.any(String),
          type: NodeTypes.EXPRESSION_STATEMENT
        }
      ],
      children: expect.any(Array),
      id: expect.any(String),
      type: NodeTypes.PROGRAM
    })
  })

  test('parses a double StaticMemberExpression to AST', async () => {
    const code = 'a.b.c;'
    const context = setupContext({ logger: console })
    const result = await parseString(context, code)
    expect(result).toEqual({
      body: [
        {
          children: expect.any(Array),
          expression: {
            children: expect.any(Array),
            id: expect.any(String),
            object: {
              children: expect.any(Array),
              id: expect.any(String),
              object: {
                id: expect.any(String),
                name: 'a',
                tokenList: expect.any(List),
                type: NodeTypes.IDENTIFIER
              },
              property: {
                id: expect.any(String),
                name: 'b',
                tokenList: expect.any(List),
                type: NodeTypes.IDENTIFIER
              },
              type: NodeTypes.STATIC_MEMBER_EXPRESSION
            },
            property: {
              id: expect.any(String),
              name: 'c',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            type: NodeTypes.STATIC_MEMBER_EXPRESSION
          },
          id: expect.any(String),
          type: NodeTypes.EXPRESSION_STATEMENT
        }
      ],
      children: expect.any(Array),
      id: expect.any(String),
      type: NodeTypes.PROGRAM
    })
  })

  test('parse a simple ComputedMemberExpression with Range to AST', async () => {
    const context = setupContext({ logger: console })
    const result = await parseString(context, 'a[1:2];')
    expect(result).toEqual({
      body: [
        {
          children: expect.any(Array),
          expression: {
            children: expect.any(Array),
            id: expect.any(String),
            object: {
              id: expect.any(String),
              name: 'a',
              tokenList: expect.any(List),
              type: NodeTypes.IDENTIFIER
            },
            property: {
              children: expect.any(Array),
              end: {
                id: expect.any(String),
                raw: '2',
                tokenList: expect.any(List),
                type: NodeTypes.LITERAL,
                value: 2
              },
              id: expect.any(String),
              start: {
                id: expect.any(String),
                raw: '1',
                tokenList: expect.any(List),
                type: NodeTypes.LITERAL,
                value: 1
              },
              type: NodeTypes.RANGE
            },
            type: NodeTypes.COMPUTED_MEMBER_EXPRESSION
          },
          id: expect.any(String),
          type: NodeTypes.EXPRESSION_STATEMENT
        }
      ],
      children: expect.any(Array),
      id: expect.any(String),
      type: NodeTypes.PROGRAM
    })
  })

  test('parses a simple true boolean Literal', async () => {
    const code = 'true;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple false boolean Literal', async () => {
    const code = 'false;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple number Literal', async () => {
    const code = '123;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple single quote string Literal', async () => {
    const code = "'abc';"
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple double quote string Literal', async () => {
    const code = '"abc";'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple Identifier', async () => {
    const code = 'a;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "+"', async () => {
    const code = '+a;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "-"', async () => {
    const code = '-a;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple UnaryExpression with a "!"', async () => {
    const code = '!a;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a AllowStatement "allow read: if true;"', async () => {
    const code = 'allow read: if true;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple AssignmentExpression', async () => {
    const code = 'a = b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a + b"', async () => {
    const code = 'a + b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a - b"', async () => {
    const code = 'a - b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a / b"', async () => {
    const code = 'a / b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a * b"', async () => {
    const code = 'a * b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression that starts with a Literal "1 * a;"', async () => {
    const code = '1 * a;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a % b"', async () => {
    const code = 'a % b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression that starts with a Literal "1 % a;"', async () => {
    const code = '1 % a;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a == b"', async () => {
    const code = 'a == b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a != b"', async () => {
    const code = 'a != b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a > b"', async () => {
    const code = 'a > b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a >= b"', async () => {
    const code = 'a >= b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a < b"', async () => {
    const code = 'a < b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a <= b"', async () => {
    const code = 'a <= b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a && b"', async () => {
    const code = 'a && b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a || b"', async () => {
    const code = 'a || b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple BinaryExpression "a is b"', async () => {
    const code = 'a is b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple CallExpression "foo()"', async () => {
    const code = 'foo();'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple CallExpression with one argument "foo(\'bar\')"', async () => {
    const code = 'foo();'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple CallExpression with two arguments "foo(\'bar\', 123)"', async () => {
    const code = 'foo();'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ComputedMemberExpression', async () => {
    const code = 'a["b"];'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a double ComputedMemberExpression', async () => {
    const code = 'a["b"]["c"];'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a double ComputedMemberExpression that uses a BinaryExpression as the property "a[1 % b];"', async () => {
    const code = 'a[1 % b];'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a ComputedMemberExpression with a Range "foo[1:4];"', async () => {
    const code = 'foo[1:4];'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a ComputedMemberExpression with a Range "foo[a:b];"', async () => {
    const code = 'foo[a:b];'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ConditionalExpression', async () => {
    const code = 'true ? true : false;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a ConditionalExpression "foo != null ? 123 : null', async () => {
    const code = 'foo != null ? 123 : null;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a multi StaticMemberExpression', async () => {
    const code = 'a.b.c.d.e;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple FunctionDeclaration', async () => {
    const code = 'function foo() {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a FunctionDeclaration with a keyword in the name', async () => {
    const code = 'function isBoolean() {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a FunctionDeclaration with a ReturnStatement', async () => {
    const code = 'function foo() { return "foo" }'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an IfStatement "if true;"', async () => {
    const code = 'if true;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an IfStatement "if foo;"', async () => {
    const code = 'if foo;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an IfStatement "if foo() && bar();"', async () => {
    const code = 'if foo() && bar();'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a LetDeclaration "let foo = true"', async () => {
    const code = 'let foo = true;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('throws when missing identifier for LetDeclaration', async () => {
    const code = 'let = true;'
    const context = setupContext({ logger: console })
    expect(parseString(context, code)).rejects.toEqual(
      new Error('Expected Identifier')
    )
  })

  test('parses an empty ListExpression "[];"', async () => {
    const code = '[];'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ListExpression "[\'foo\'];"', async () => {
    const code = "['foo'];"
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a ListExpression "[ true, \'foo\', bar() ];"', async () => {
    const code = "[ true, 'foo', bar() ];"
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an empty MapExpression "{};"', async () => {
    const code = '{};'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple MapExpression "{ \'foo\': bar };"', async () => {
    const code = "{ 'foo': bar };"
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test("parses a MapExpression \"{ 'a': true, 'b':'foo', 'c':bar() };\"", async () => {
    const code = "{ 'a': true, 'b':'foo', 'c':bar() };"
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a MatchStatement with single path part "/foo"', async () => {
    const code = 'match /foo {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a MatchStatement with multiple path parts "/foo/bar/baz"', async () => {
    const code = 'match /foo/bar/baz {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a MatchStatement with variable "/{foo}"', async () => {
    const code = 'match /{foo} {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a MatchStatement with multiple nested variables "/some/{foo}/and/{bar}"', async () => {
    const code = 'match /some/{foo}/and/{bar} {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses an empty ParenthesesExpression "(foo);"', async () => {
    const code = '(foo);'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a PathExpression with single path part "/foo;"', async () => {
    const code = '/foo;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a PathExpression with multiple path parts "/foo/bar/baz;"', async () => {
    const code = '/foo/bar/baz;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a PathExpression with PathPartExpression "/$(foo);"', async () => {
    const code = '/$(foo);'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple ServiceStatement', async () => {
    const code = 'service cloud.firestore {}'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a simple StaticMemberExpression', async () => {
    const code = 'a.b;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })

  test('parses a double StaticMemberExpression', async () => {
    const code = 'a.b.c;'
    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    expect(generateString(context, { ast })).toEqual(code)
  })
})
