import { List } from 'immutable'

import { setupContext } from '../../context'

import ColonOperator from './ColonOperator'

describe('ColonOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => ColonOperator.parse(context, tokenList)).toThrow()
  })
})
