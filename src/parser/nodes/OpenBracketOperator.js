import { NodeTypes, OperatorTypes, Operators, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'

const OpenBracketOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.OPEN_BRACKET}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_OPEN_BRACKET) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected operator '${Operators.OPEN_BRACKET}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      operatorType: OperatorTypes.OPEN_BRACKET,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_OPEN_BRACKET
}

export default OpenBracketOperator
