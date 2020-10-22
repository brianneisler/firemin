import { slice } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  Operators,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createBackwardSlashOperator from '../pipes/createBackwardSlashOperator'
import { getTokenListPosition } from '../util'

const BackwardSlashOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.BACKWARD_SLASH,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.BACKWARD_SLASH}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_BACKWARD_SLASH) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.BACKWARD_SLASH}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createBackwardSlashOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_BACKWARD_SLASH,
  type: ParserTypes.OPERATOR
}

export default BackwardSlashOperator
