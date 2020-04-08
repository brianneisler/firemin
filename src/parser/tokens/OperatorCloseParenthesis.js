import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_CLOSE_PARENTHESIS_TEST = /^\)/

const OperatorCloseParenthesis = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_CLOSE_PARENTHESIS,
    value: Operators.CLOSE_PARENTHESIS
  }),
  test: (context, data) => REGEX_OPERATOR_CLOSE_PARENTHESIS_TEST.test(data)
}

export default OperatorCloseParenthesis
