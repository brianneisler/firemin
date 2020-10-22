import { slice } from 'ramda'

import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createFunctionKeyword from '../pipes/createFunctionKeyword'
import { getTokenListPosition } from '../util'

const FunctionKeyword = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.KEYWORD &&
    value.name === Keywords.FUNCTION,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected keyword '${Keywords.FUNCTION}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.KEYWORD_FUNCTION) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected keyword '${Keywords.FUNCTION}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createFunctionKeyword({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_FUNCTION
  },
  type: ParserTypes.KEYWORD
}

export default FunctionKeyword
