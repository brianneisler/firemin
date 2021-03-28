import { generateString, parseString, setupContext } from 'firetree'

import minimizeAST from './minimizeAST'

describe('minimizeAST', () => {
  test('collapses a simple single use function that returns a Literal', async () => {
    const code = 'function foo() { return true; }' + 'foo();'

    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const minimizedAST = await minimizeAST(context, ast)
    expect(generateString(context, { ast: minimizedAST })).toEqual('true;')
  })

  test('replaces params with args in function collapse', async () => {
    const code = 'function foo(param1) { return param1; }' + 'foo(true);'

    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const minimizedAST = await minimizeAST(context, ast)
    expect(generateString(context, { ast: minimizedAST })).toEqual('true;')
  })

  test('replaces params with args in function collapse of UnaryExpression', async () => {
    const code = 'function foo(param1) { return !param1; }' + 'foo(true);'

    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const minimizedAST = await minimizeAST(context, ast)
    expect(generateString(context, { ast: minimizedAST })).toEqual('!true;')
  })

  test('replaces multiple params with args in function collapse of BinaryExpression', async () => {
    const code = 'function foo(param1, param2) { return param1 && param2; }' + 'foo(true, false);'

    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const minimizedAST = await minimizeAST(context, ast)
    expect(generateString(context, { ast: minimizedAST })).toEqual('true && false;')
  })

  test('replaces multiple params with args in function collapse', async () => {
    const code =
      'function foo(param1, param2, param3) { return param1 && param2 && param3; }' +
      'foo(true, false, true);'

    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const minimizedAST = await minimizeAST(context, ast)
    expect(generateString(context, { ast: minimizedAST })).toEqual('true && false && true;')
  })

  test('removes an unused function', async () => {
    const code = 'function a() { return true; }' + 'function b() { return true; }' + 'b();' + 'b();'

    const context = setupContext({ logger: console })
    const ast = await parseString(context, code)
    const minimizedAST = await minimizeAST(context, ast)
    expect(generateString(context, { ast: minimizedAST })).toEqual(
      'function b() { return true; }' + 'b();' + 'b();'
    )
  })
})
