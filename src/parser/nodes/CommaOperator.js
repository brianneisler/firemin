import { NodeTypes, OperatorTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'

const CommaOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (nextToken.type !== TokenTypes.OPERATOR_COMMA) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected CommaOperator. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      operatorType: OperatorTypes.COMMA,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.Operator,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_COMMA
}

export default CommaOperator
