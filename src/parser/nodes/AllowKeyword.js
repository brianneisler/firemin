import { slice } from 'ramda'

import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createAllowKeyword from '../pipes/createAllowKeyword'
import { getTokenListPosition } from '../util'

const AllowKeyword = {
  identify: (context, node) => node,
  is: (value) =>
    value && value.type === NodeTypes.KEYWORD && value.name === Keywords.ALLOW,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected keyword '${Keywords.ALLOW}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.KEYWORD_ALLOW) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected keyword '${Keywords.ALLOW}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createAllowKeyword({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_ALLOW
  },
  type: ParserTypes.KEYWORD
}

export default AllowKeyword
