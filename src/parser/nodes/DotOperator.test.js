import { List } from 'immutable'

import { setupContext } from '../../context'

import DotOperator from './DotOperator'

describe('DotOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => DotOperator.parse(context, tokenList)).toThrow()
  })
})
