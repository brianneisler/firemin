import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_QUESTION_MARK_TEST = /^\?/

const OperatorQuestionMark = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_QUESTION_MARK,
    value: Operators.QUESTION_MARK
  }),
  test: (context, data) => REGEX_OPERATOR_QUESTION_MARK_TEST.test(data)
}

export default OperatorQuestionMark
