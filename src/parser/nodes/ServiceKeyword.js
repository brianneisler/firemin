import { slice } from 'ramda'

import { Keywords, NodeTypes, ParserTypes, TokenTypes } from '../../constants'
import createServiceKeyword from '../pipes/createServiceKeyword'
import { getTokenListPosition } from '../util'

const ServiceKeyword = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.KEYWORD &&
    value.name === Keywords.SERVICE,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected keyword '${Keywords.SERVICE}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.KEYWORD_SERVICE) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected keyword '${Keywords.SERVICE}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createServiceKeyword({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) => {
    const firstToken = tokenList.get(0)
    return firstToken.type === TokenTypes.KEYWORD_SERVICE
  },
  type: ParserTypes.KEYWORD
}

export default ServiceKeyword
