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

const UnaryPlusOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.UNARY_PLUS,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.UNARY_PLUS}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_UNARY_PLUS) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.UNARY_PLUS}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      id: uuidv4(),
      operatorType: OperatorTypes.UNARY_PLUS,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_UNARY_PLUS,
  type: ParserTypes.OPERATOR
}

export default UnaryPlusOperator
