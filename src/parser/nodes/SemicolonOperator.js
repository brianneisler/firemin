import { NodeTypes, OperatorTypes, Operators, ParserTypes, TokenTypes } from '../../constants'
import { getTokenListPosition } from '../util'
import { slice } from 'ramda'
import { v4 as uuidv4 } from 'uuid'

const SemicolonOperator = {
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.SEMICOLON}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_SEMICOLON) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(context, tokenList)
      throw new Error(
        `Expected operator '${Operators.SEMICOLON}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return {
      id: uuidv4(),
      operatorType: OperatorTypes.SEMICOLON,
      tokenList: slice(0, 1, tokenList),
      type: NodeTypes.OPERATOR,
      value: nextToken.value
    }
  },
  test: (context, tokenList) => tokenList.get(0).type === TokenTypes.OPERATOR_SEMICOLON,
  type: ParserTypes.OPERATOR
}

export default SemicolonOperator
