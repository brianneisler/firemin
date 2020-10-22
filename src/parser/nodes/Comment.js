import { slice } from 'ramda'

import { NodeTypes, TokenTypes } from '../../constants'
import createComment from '../pipes/createComment'
import getTokenListPosition from '../util/getTokenListPosition'

const Comment = {
  identify: (context, node) => node,
  is: (value) => value && value.type === NodeTypes.COMMENT,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error('Expected Comment. Instead reached the end of the file.')
    }
    if (nextToken.type !== TokenTypes.COMMENT) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected Comment. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createComment({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.COMMENT
}

export default Comment
