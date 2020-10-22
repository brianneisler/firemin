import { slice } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  Operators,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createCommaOperator from '../pipes/createCommaOperator'
import { getTokenListPosition } from '../util'

const CommaOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.COMMA,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.COMMA}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_COMMA) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.COMMA}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createCommaOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_COMMA,
  type: ParserTypes.OPERATOR
}

export default CommaOperator
