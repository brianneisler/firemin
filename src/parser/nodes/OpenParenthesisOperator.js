import { NodeTypes, OperatorTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'

const OpenParenthesisOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (nextToken.type !== TokenTypes.OPERATOR_OPEN_PARENTHESIS) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected OpenParenthesisOperator. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      operatorType: OperatorTypes.OPEN_PARENTHESIS,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.Operator,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_OPEN_PARENTHESIS
}

export default OpenParenthesisOperator
