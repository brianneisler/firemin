import { minimize, setupCliContext } from '../src'
import { resolve } from 'path'

describe('integration', () => {
  test('minimize file', async () => {
    const context = setupCliContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: resolve(__dirname, 'files', 'firestore.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{function someFunc(someParam1,someParam2){return someParam1.keys().hasAll([someParam2])}match/some/path/{arg1}/{arg2}{allow read:if someFunc(arg1,arg2);allow create:if someFunc(arg1,arg2);allow update:if someFunc(arg1,arg2);allow delete:if someFunc(arg1,arg2);}}}"
    )
  })
})
