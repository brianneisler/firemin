import { List } from 'immutable'

import { setupContext } from '../../context'

import BackwardSlashOperator from './BackwardSlashOperator'

describe('BackwardSlashOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => BackwardSlashOperator.parse(context, tokenList)).toThrow()
  })
})
