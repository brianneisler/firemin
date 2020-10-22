import { List } from 'immutable'

import { setupContext } from '../../context'
import { createAssignmentOperator } from '../pipes'
import { OperatorAssignment } from '../tokens'

import AssignmentOperator from './AssignmentOperator'

describe('AssignmentOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AssignmentOperator.parse(context, tokenList)).toThrow()
  })

  test('is returns true for AssignmentOperator node', () => {
    const node = createAssignmentOperator({
      tokenList: List([OperatorAssignment.parse()])
    })
    expect(AssignmentOperator.is(node)).toBe(true)
  })
})
