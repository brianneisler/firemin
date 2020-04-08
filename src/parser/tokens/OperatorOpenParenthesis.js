import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_OPEN_PARENTHESIS_TEST = /^\(/

const OperatorOpenParenthesis = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_OPEN_PARENTHESIS,
    value: Operators.OPEN_PARENTHESIS
  }),
  test: (context, data) => REGEX_OPERATOR_OPEN_PARENTHESIS_TEST.test(data)
}

export default OperatorOpenParenthesis
