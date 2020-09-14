import { find, slice } from 'ramda'

import { TokenTypes } from '../../constants'

const findNextRealToken = (tokenList, startIndex = 0) =>
  find(
    (token) =>
      token.type !== TokenTypes.WHITESPACE && token.type !== TokenTypes.COMMENT,
    slice(startIndex, tokenList.size, tokenList)
  )

export default findNextRealToken
