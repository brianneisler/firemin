import { slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import {
  NodeTypes,
  OperatorTypes,
  Operators,
  ParserTypes,
  TokenTypes
} from '../../constants'
import { getTokenListPosition } from '../util'

const UnaryMinusOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.UNARY_MINUS,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.UNARY_MINUS}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_UNARY_MINUS) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.UNARY_MINUS}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      id: uuidv4(),
      operatorType: OperatorTypes.UNARY_MINUS,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_UNARY_MINUS,
  type: ParserTypes.OPERATOR
}

export default UnaryMinusOperator
