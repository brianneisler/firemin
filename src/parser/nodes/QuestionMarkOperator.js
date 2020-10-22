import { slice } from 'ramda'

import {
  NodeTypes,
  OperatorTypes,
  Operators,
  ParserTypes,
  TokenTypes
} from '../../constants'
import createQuestionMarkOperator from '../pipes/createQuestionMarkOperator'
import { getTokenListPosition } from '../util'

const QuestionMarkOperator = {
  identify: (context, node) => node,
  is: (value) =>
    value &&
    value.type === NodeTypes.OPERATOR &&
    value.operatorType === OperatorTypes.QUESTION_MARK,
  parse: (context, tokenList) => {
    const nextToken = tokenList.get(0)
    if (!nextToken) {
      throw new Error(
        `Expected operator '${Operators.QUESTION_MARK}'. Instead reached the end of the file.`
      )
    }
    if (nextToken.type !== TokenTypes.OPERATOR_QUESTION_MARK) {
      const { lastLineCharacterCount, lineCount } = getTokenListPosition(
        context,
        tokenList
      )
      throw new Error(
        `Expected operator '${Operators.QUESTION_MARK}'. Instead was given '${
          tokenList.get(0).value
        }' at ${lineCount}:${lastLineCharacterCount}`
      )
    }
    return createQuestionMarkOperator({
      tokenList: slice(0, 1, tokenList)
    })
  },
  test: (context, tokenList) =>
    tokenList.get(0).type === TokenTypes.OPERATOR_QUESTION_MARK,
  type: ParserTypes.OPERATOR
}

export default QuestionMarkOperator
