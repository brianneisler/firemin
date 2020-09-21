import { List } from 'immutable'

import { setupContext } from '../../context'

import SemicolonOperator from './SemicolonOperator'

describe('SemicolonOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => SemicolonOperator.parse(context, tokenList)).toThrow()
  })
})
