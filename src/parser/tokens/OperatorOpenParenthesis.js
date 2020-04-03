import { OPERATOR_OPEN_PARENTHESIS } from '../../constants/TokenTypes'

const REGEX_OPERATOR_OPEN_PARENTHESIS_TEST = /^\(/

const OperatorOpenParenthesis = {
  parse: () => ({
    length: 1,
    type: OPERATOR_OPEN_PARENTHESIS,
    value: '('
  }),
  test: (data) => REGEX_OPERATOR_OPEN_PARENTHESIS_TEST.test(data)
}

export default OperatorOpenParenthesis
