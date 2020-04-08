import { Keywords, NodeTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'
import Keyword from './Keyword'

const AllowKeyword = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(`Expected keyword '${Keywords.ALLOW}'. Instead reached the end of the file.`)
    }
    if (nextToken.type !== TokenTypes.KEYWORD_ALLOW) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected keyword '${Keywords.ALLOW}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      name: Keyword.ALLOW,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.KEYWORD
    }
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_ALLOW
  }
}

export default AllowKeyword
