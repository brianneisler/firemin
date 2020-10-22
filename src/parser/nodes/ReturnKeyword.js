import { slice } from 'ramda'

import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createReturnKeyword from '../pipes/createReturnKeyword'
import { getTokenListPosition } from '../util'

const ReturnKeyword = {
  identify: (context, node) => node,
  is: (value) =>
    value && value.type === NodeTypes.KEYWORD && value.name === Keywords.RETURN,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected keyword '${Keywords.RETURN}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.KEYWORD_RETURN) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected keyword '${Keywords.RETURN}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createReturnKeyword({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_RETURN
  },
  type: ParserTypes.KEYWORD
}

export default ReturnKeyword
