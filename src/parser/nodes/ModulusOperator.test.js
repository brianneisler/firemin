import { List } from 'immutable'

import { setupContext } from '../../context'

import ModulusOperator from './ModulusOperator'

describe('ModulusOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => ModulusOperator.parse(context, tokenList)).toThrow()
  })
})
