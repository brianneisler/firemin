import { slice } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  Operators,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createAmpersandOperator from '../pipes/createAmpersandOperator'
import { getTokenListPosition } from '../util'

const AmpersandOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.AMPERSAND,
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
        `Expected operator '${Operators.AMPERSAND}'. Instead was given '${nextToken.value}' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createAmpersandOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_AMPERSAND,
  type: ParserTypes.OPERATOR
}

export default AmpersandOperator
