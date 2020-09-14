import { List } from 'immutable'

import { setupContext } from '../../context'

import AllowKeyword from './AllowKeyword'

describe('AllowKeyword', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AllowKeyword.parse(context, tokenList)).toThrow()
  })
})
