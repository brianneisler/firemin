import { List } from 'immutable'

import { setupContext } from '../../context'
import { createAmpersandOperator } from '../pipes'
import { OperatorAmpersand } from '../tokens'

import AmpersandOperator from './AmpersandOperator'

describe('AmpersandOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AmpersandOperator.parse(context, tokenList)).toThrow()
  })

  test('is returns true for AmpersandOperator node', () => {
    const node = createAmpersandOperator({
      tokenList: List([OperatorAmpersand.parse()])
    })
    expect(AmpersandOperator.is(node)).toBe(true)
  })
})
