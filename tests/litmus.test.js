import { resolve as pathResolve } from 'path'

import { setupContext } from 'firetree'

import { minimize } from '../src'

describe('litmus', () => {
  test('large rules file from moltres project', async () => {
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.litmus.rules')
    })
    expect(result).toMatchSnapshot()
  })
})
