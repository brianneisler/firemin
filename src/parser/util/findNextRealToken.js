import { TokenTypes } from '../../constants'
import { find, slice } from 'ramda'

const findNextRealToken = (tokenList, startIndex = 0) =>
  find(
    (token) => token.type !== TokenTypes.WHITESPACE && token.type !== TokenTypes.COMMENT,
    slice(startIndex, tokenList.size, tokenList)
  )

export default findNextRealToken
