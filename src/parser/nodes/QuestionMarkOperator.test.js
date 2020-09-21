import { List } from 'immutable'

import { setupContext } from '../../context'

import QuestionMarkOperator from './QuestionMarkOperator'

describe('QuestionMarkOperator', () => {
  test('parse throws execption when tokenList is empty', async () => {
    const context = setupContext({
      logger: console
    })
    const tokenList = List([])
    expect(() => QuestionMarkOperator.parse(context, tokenList)).toThrow()
  })
})
