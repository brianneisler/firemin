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

const AmpersandOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.AMPERSAND}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_AMPERSAND) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.AMPERSAND}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      id: uuidv4(),
      operatorType: OperatorTypes.AMPERSAND,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_AMPERSAND,
  type: ParserTypes.OPERATOR
}

export default AmpersandOperator
