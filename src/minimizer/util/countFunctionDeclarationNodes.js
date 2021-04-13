import { NodeTypes, walkReduceTree } from 'firetree'

import { weakMemoize } from '../../utils'

const DEFAULT_IGNORES = [NodeTypes.WHITESPACE]
/**
 * Counts the number of expressions in a function declaration
 */
const countFunctionDeclarationNodes = weakMemoize((functionDeclaration, ignore = DEFAULT_IGNORES) =>
  walkReduceTree(
    (accum, node) => {
      if (!ignore.includes(node.type)) {
        return accum + 1
      }
      return accum
    },
    0,
    functionDeclaration
  )
)

export default countFunctionDeclarationNodes
