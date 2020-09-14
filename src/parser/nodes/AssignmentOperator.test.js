import { List } from 'immutable'

import { setupContext } from '../../context'

import AssignmentOperator from './AssignmentOperator'

describe('AssignmentOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AssignmentOperator.parse(context, tokenList)).toThrow()
  })
})
