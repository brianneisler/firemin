import { List } from 'immutable'

import { setupContext } from '../../context'

import GreaterThanEqualOperator from './GreaterThanEqualOperator'

describe('GreaterThanEqualOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => GreaterThanEqualOperator.parse(context, tokenList)).toThrow()
  })
})
