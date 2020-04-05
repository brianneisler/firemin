import { NodeTypes, OperatorTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'

const OpenCurlyBraceOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (nextToken.type !== TokenTypes.OPERATOR_OPEN_CURLY_BRACE) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected OpenCurlyBraceOperator. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      operatorType: OperatorTypes.OPEN_CURLY_BRACE,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.Operator,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_OPEN_CURLY_BRACE
}

export default OpenCurlyBraceOperator
