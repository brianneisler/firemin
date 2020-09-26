import { List } from 'immutable'

import { setupContext } from '../../context'
import { createBackwardSlashOperator } from '../pipes'
import { OperatorBackwardSlash } from '../tokens'

import BackwardSlashOperator from './BackwardSlashOperator'

describe('BackwardSlashOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => BackwardSlashOperator.parse(context, tokenList)).toThrow()
  })

  test('is returns true for BackwardSlashOperator node', () => {
    const node = createBackwardSlashOperator({
      tokenList: List([OperatorBackwardSlash.parse()])
    })
    expect(BackwardSlashOperator.is(node)).toBe(true)
  })
})
