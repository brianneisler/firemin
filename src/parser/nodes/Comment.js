import { NodeTypes, TokenTypes } from '../../constants'
import { slice } from 'ramda'
import getTokenListPosition from '../util/getTokenListPosition'

const Comment = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error('Expected Comment. Instead reached the end of the file.')
    }
    if (nextToken.type !== TokenTypes.COMMENT) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected Comment. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.COMMENT,
      value: tokenList.get(0).value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.COMMENT
}

export default Comment
