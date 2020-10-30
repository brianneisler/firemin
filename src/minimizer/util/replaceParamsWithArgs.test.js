import { setupContext } from '../../context'
import { generateString } from '../../generator'
import { tokenize } from '../../parser'
import {
  BinaryExpression,
  Identifier,
  LetDeclaration,
  StaticMemberExpression
} from '../../parser/nodes'

import replaceParamsWithArgs from './replaceParamsWithArgs'

describe('replaceParamsWithArgs', () => {
  test('should replace single identifier', async () => {
    const context = setupContext({
      logger: console
    })
    const statement = Identifier.parse(
      context,
      await tokenize(context, { string: 'foo' })
    )
    const params = [
      Identifier.parse(context, await tokenize(context, { string: 'foo' }))
    ]
    const args = [
      Identifier.parse(context, await tokenize(context, { string: 'bar' }))
    ]
    const result = replaceParamsWithArgs(context, statement, params, args)
    expect(result).toBe(args[0])
  })

  test('should replace single identifier in nested statement', async () => {
    const context = setupContext({
      logger: console
    })
    const statement = BinaryExpression.parse(
      context,
      await tokenize(context, { string: '1 + foo' })
    )
    const params = [
      Identifier.parse(context, await tokenize(context, { string: 'foo' }))
    ]
    const args = [
      Identifier.parse(context, await tokenize(context, { string: 'bar' }))
    ]
    const result = replaceParamsWithArgs(context, statement, params, args)

    expect(generateString(context, { ast: result })).toBe('1 + bar')
  })

  test('should NOT replace Identifier in LetDeclaration', async () => {
    const context = setupContext({
      logger: console
    })
    const statement = LetDeclaration.parse(
      context,
      await tokenize(context, { string: 'let foo = 1;' })
    )
    const params = [
      Identifier.parse(context, await tokenize(context, { string: 'foo' }))
    ]
    const args = [
      Identifier.parse(context, await tokenize(context, { string: 'bar' }))
    ]
    const result = replaceParamsWithArgs(context, statement, params, args)

    expect(generateString(context, { ast: result })).toBe('let foo = 1;')
  })

  test('should replace Object in StaticMemberExpression', async () => {
    const context = setupContext({
      logger: console
    })
    const statement = StaticMemberExpression.parse(
      context,
      await tokenize(context, { string: 'foo.bar' })
    )
    const params = [
      Identifier.parse(context, await tokenize(context, { string: 'foo' }))
    ]
    const args = [
      Identifier.parse(context, await tokenize(context, { string: 'bar' }))
    ]
    const result = replaceParamsWithArgs(context, statement, params, args)

    expect(generateString(context, { ast: result })).toBe('bar.bar')
  })

  test('should NOT replace Property in StaticMemberExpression', async () => {
    const context = setupContext({
      logger: console
    })
    const statement = StaticMemberExpression.parse(
      context,
      await tokenize(context, { string: 'bar.foo' })
    )
    const params = [
      Identifier.parse(context, await tokenize(context, { string: 'foo' }))
    ]
    const args = [
      Identifier.parse(context, await tokenize(context, { string: 'bar' }))
    ]
    const result = replaceParamsWithArgs(context, statement, params, args)

    expect(generateString(context, { ast: result })).toBe('bar.foo')
  })
})
