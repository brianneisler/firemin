import { OrderedMap } from 'immutable'

import { weakMemoize } from '../../utils'

import countFunctionDeclarationNodes from './countFunctionDeclarationNodes'
import findAllFunctionDeclarations from './findAllFunctionDeclarations'

const countAllFunctionDeclarationNodes = weakMemoize((ast) => {
  const functionDeclarations = findAllFunctionDeclarations(ast)
  return functionDeclarations.reduce(
    (accum, functionDeclaration) =>
      accum.set(functionDeclaration.id, countFunctionDeclarationNodes(functionDeclaration)),
    functionDeclarations.reduce(
      (accum, functionDeclaration) => accum.set(functionDeclaration.id, 0),
      // NOTE BRN: This OrderedMap ensures that the function map is iterated in
      // a deterministic way. Since this map is used to make minifications, it
      // ensures that the minifications always happen in the same order which
      // can make debugging a lot easier.
      OrderedMap()
    )
  )
})

export default countAllFunctionDeclarationNodes
