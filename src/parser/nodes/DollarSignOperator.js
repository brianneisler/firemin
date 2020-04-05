import { NodeTypes, OperatorTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'

const DollarSignOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (nextToken.type !== TokenTypes.OPERATOR_DOLLAR_SIGN) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected DollarSignOperator. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      operatorType: OperatorTypes.DOLLAR_SIGN,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.Operator,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_DOLLAR_SIGN
}

export default DollarSignOperator
