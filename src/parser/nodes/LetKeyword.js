import { slice } from 'ramda'

import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createLetKeyword from '../pipes/createLetKeyword'
import { getTokenListPosition } from '../util'

const LetKeyword = {
  identify: (context, node) => node,
  is: (value) =>
    value && value.type === NodeTypes.KEYWORD && value.name === Keywords.LET,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected keyword '${Keywords.LET}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.KEYWORD_LET) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected keyword '${Keywords.LET}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createLetKeyword({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_LET
  },
  type: ParserTypes.KEYWORD
}

export default LetKeyword
