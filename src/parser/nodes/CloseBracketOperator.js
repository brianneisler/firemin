import { slice } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  Operators,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createCloseBracketOperator from '../pipes/createCloseBracketOperator'
import { getTokenListPosition } from '../util'

const CloseBracketOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.CLOSE_BRACKET,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.CLOSE_BRACKET}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_CLOSE_BRACKET) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.CLOSE_BRACKET}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createCloseBracketOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_CLOSE_BRACKET,
  type: ParserTypes.OPERATOR
}

export default CloseBracketOperator
