import { OPERATOR_CLOSE_PARENTHESIS } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_CLOSE_PARENTHESIS_TEST = /^\)/

const OperatorCloseParenthesis = {
  parse: () => ({
    length: 1,
    type: OPERATOR_CLOSE_PARENTHESIS,
    value: ')'
  }),
  test: (data) => REGEX_OPERATOR_CLOSE_PARENTHESIS_TEST.test(data)
}

export default OperatorCloseParenthesis
