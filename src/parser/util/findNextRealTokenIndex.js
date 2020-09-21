import { find, slice } from 'ramda'

import { TokenTypes } from '../../constants'

const findNextRealTokenIndex = (tokenList, startIndex = 0) =>
  find(
    (tokenIndex) => {
      const token = tokenList.get(tokenIndex)
      return (
        token.type !== TokenTypes.WHITESPACE &&
        token.type !== TokenTypes.COMMENT
      )
    },
    startIndex === 0
      ? tokenList.keySeq().toArray()
      : slice(startIndex, tokenList.size, tokenList).keySeq().toArray()
  )

export default findNextRealTokenIndex
