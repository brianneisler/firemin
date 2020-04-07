import { NodeTypes, OperatorTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'

const LessThanOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (nextToken.type !== TokenTypes.OPERATOR_LESS_THAN) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected LessThanOperator. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      operatorType: OperatorTypes.LESS_THAN,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_LESS_THAN
}

export default LessThanOperator
