import { TokenTypes } from '../../constants'
import { findIndex, slice } from 'ramda'

const findNextRealToken = (tokenList, startIndex = 0) =>
  findIndex(
    (token) => token.type !== TokenTypes.WHITESPACE && token.type !== TokenTypes.COMMENT,
    startIndex === 0 ? tokenList : slice(startIndex, tokenList.size(), tokenList)
  )

export default findNextRealToken
