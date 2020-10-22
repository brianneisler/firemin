import { EOL } from 'os'
import { resolve as pathResolve } from 'path'

import { readFile } from 'fs-extra'

import { minimize, setupContext } from '../src'

describe('litmus', () => {
  test('large rules file from moltres project', async () => {
    const expected = await readFile(
      pathResolve(__dirname, 'files', 'firestore.litmus.min.rules'),
      'utf8'
    )
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.litmus.rules')
    })
    expect(result + EOL).toEqual(expected)
  })
})
