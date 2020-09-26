import { List } from 'immutable'

import { setupContext } from '../../context'
import { createAtSignOperator } from '../pipes'
import { OperatorAtSign } from '../tokens'

import AtSignOperator from './AtSignOperator'

describe('AtSignOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AtSignOperator.parse(context, tokenList)).toThrow()
  })

  test('is returns true for AtSignOperator node', () => {
    const node = createAtSignOperator({
      tokenList: List([OperatorAtSign.parse()])
    })
    expect(AtSignOperator.is(node)).toBe(true)
  })
})
