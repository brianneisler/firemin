import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_CLOSE_BRACKET_TEST = /^\]/

const OperatorCloseBracket = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_CLOSE_BRACKET,
    value: Operators.CLOSE_BRACKET
  }),
  test: (context, data) => REGEX_OPERATOR_CLOSE_BRACKET_TEST.test(data)
}

export default OperatorCloseBracket
