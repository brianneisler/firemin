import { List } from 'immutable'
import { concat, isEmpty, isNil } from 'ramda'

import walkReduceAST from '../ast/walkReduceAST'

const generateTokenList = (context, { ast }) => {
  // walk the ast. Find all leaves of the tree and get the tokenList from them.
  // Concat all leaves together to reform the token list
  return walkReduceAST(
    (accum, node) => {
      if (isNil(node.children) || isEmpty(node.children)) {
        return concat(accum, node.tokenList)
      }
      return accum
    },
    List(),
    ast
  )
}

export default generateTokenList
