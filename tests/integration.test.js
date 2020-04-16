import { exec } from 'child_process'
import { generateString, minimize, parse, setupCliContext } from '../src'
import { resolve as pathResolve } from 'path'
import { readFile } from 'fs-extra'

describe('integration', () => {
  test('should install globally', async () => {
    const result = await new Promise((resolve, reject) => {
      exec('npm i -g', { cwd: pathResolve(__dirname, '..') }, (error) => {
        if (error) {
          return reject(error)
        }
        return resolve(true)
      })
    })
    expect(result).toEqual(true)
  }, 30000)

  test('require index.module imports without error', () => {
    expect(() => {
      require('../index.module')
    }).not.toThrow()
  })

  test('parse and regenerate file contents', async () => {
    const context = setupCliContext({
      logger: console
    })
    const string = await readFile(pathResolve(__dirname, 'files', 'firestore.rules'), 'utf-8')

    const ast = await parse(context, {
      string
    })
    expect(generateString(context, { ast })).toEqual(string)
  })

  test('minimize file', async () => {
    const context = setupCliContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{function someFunc(someParam1,someParam2){return someParam1.keys().hasAll([someParam2])}match/some/path/{arg1}/{arg2}{allow read:if someFunc(arg1,arg2);allow create:if someFunc(arg1,arg2);allow update:if someFunc(arg1,arg2);allow delete:if someFunc(arg1,arg2);}}}"
    )
  })

  test('removes unused functions', async () => {
    const context = setupCliContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.unused-functions.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{function someFunc(someParam1,someParam2){return someParam1.keys().hasAll([someParam2])}match/some/path/{arg1}/{arg2}{allow read:if someFunc(arg1,arg2);allow create:if someFunc(arg1,arg2);allow update:if someFunc(arg1,arg2);allow delete:if someFunc(arg1,arg2);}}}"
    )
  })
})
