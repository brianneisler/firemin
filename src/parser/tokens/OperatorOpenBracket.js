import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_OPEN_BRACKET_TEST = /^\[/

const OperatorOpenBracket = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_OPEN_BRACKET,
    value: Operators.OPEN_BRACKET
  }),
  test: (context, data) => REGEX_OPERATOR_OPEN_BRACKET_TEST.test(data)
}

export default OperatorOpenBracket
