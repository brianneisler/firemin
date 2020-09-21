import { List } from 'immutable'

import { setupContext } from '../../context'

import LessThanEqualOperator from './LessThanEqualOperator'

describe('LessThanEqualOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => LessThanEqualOperator.parse(context, tokenList)).toThrow()
  })
})
