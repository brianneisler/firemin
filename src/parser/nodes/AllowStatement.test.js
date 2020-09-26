import { List } from 'immutable'

import { setupContext } from '../../context'
// import { createAllowStatement } from '../pipes'

import AllowStatement from './AllowStatement'

describe('AllowStatement', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => AllowStatement.parse(context, tokenList)).toThrow()
  })

  // test('is returns true for AllowStatement node', () => {
  //   const allowStatement = createAllowStatement({
  //     tokenList: List([StatementAllow.parse()])
  //   })
  //   expect(AllowStatement.is(allowStatement)).toBe(true)
  // })
})
