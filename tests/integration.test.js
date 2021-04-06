import { exec } from 'child_process'
import { tmpdir } from 'os'
import { resolve as pathResolve } from 'path'

import { readFile } from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'

import { minimize, setupContext } from '../src'

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

  test('programmatic minimize file', async () => {
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{function someFunc(someParam1,someParam2){let foo=true;return someParam1.keys().hasAll([someParam2])&&foo;}match/some/path/{arg1}/{arg2}{allow read:if someFunc(arg1,arg2);allow create:if someFunc(arg1,arg2);allow update:if someFunc(arg1,arg2);allow delete:if someFunc(arg1,arg2);}}}"
    )
  })

  test('programmatic minimize file and output to another file', async () => {
    const context = setupContext({
      logger: console
    })
    const output = pathResolve(tmpdir(), uuidv4(), 'firestore.min.rules')
    const returned = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.rules'),
      output
    })

    const result = await readFile(output, 'utf-8')

    expect(returned).toEqual(undefined)
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{function someFunc(someParam1,someParam2){let foo=true;return someParam1.keys().hasAll([someParam2])&&foo;}match/some/path/{arg1}/{arg2}{allow read:if someFunc(arg1,arg2);allow create:if someFunc(arg1,arg2);allow update:if someFunc(arg1,arg2);allow delete:if someFunc(arg1,arg2);}}}"
    )
  })

  test('binary minimize file and output to stdout', async () => {
    // NOTE BRN: This runs against the production built code so you must `npm run build` before this
    // will pass.
    const result = await new Promise((resolve, reject) => {
      exec(
        `npx ./bin/firemin minimize -f ${pathResolve(__dirname, 'files', 'firestore.rules')}`,
        { cwd: pathResolve(__dirname, '..') },
        (error, stdout) => {
          if (error) {
            return reject(error)
          }
          return resolve(stdout)
        }
      )
    })

    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{function someFunc(someParam1,someParam2){let foo=true;return someParam1.keys().hasAll([someParam2])&&foo;}match/some/path/{arg1}/{arg2}{allow read:if someFunc(arg1,arg2);allow create:if someFunc(arg1,arg2);allow update:if someFunc(arg1,arg2);allow delete:if someFunc(arg1,arg2);}}}"
    )
  })

  test('minifier removes unused functions', async () => {
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.unused-functions.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{match/some/path/{arg1}/{arg2}{allow read:if arg1.keys().hasAll([arg2]);allow create:if arg1.keys().hasAll([arg2]);allow update:if arg1.keys().hasAll([arg2]);allow delete:if arg1.keys().hasAll([arg2]);}}}"
    )
  })

  test('minfier collapses single use functions', async () => {
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.single-use-functions.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{match/some/path/{arg1}/{arg2}{allow read:if(arg1&&arg2);allow create:if!arg1;}}}"
    )
  })

  test('collapses nested property access with same name correctly', async () => {
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.nested-property-access.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{match/some/path/{arg}{allow read:if arg.data.data;}}}"
    )
  })

  test('minfier collapses small functions', async () => {
    const context = setupContext({
      logger: console
    })
    const result = await minimize(context, {
      filePath: pathResolve(__dirname, 'files', 'firestore.small-functions.rules')
    })
    expect(result).toEqual(
      "rules_version='2';service cloud.firestore{match/databases/{database}/documents{match/some/path/{arg1}/{arg2}{allow read:if!arg1;allow create:if!arg1;allow update:if(arg1&&arg2);allow delete:if(arg1&&arg2);}}}"
    )
  })
})
