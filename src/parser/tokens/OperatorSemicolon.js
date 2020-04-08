import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_SEMICOLON_TEST = /^;/

const OperatorSemicolon = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_SEMICOLON,
    value: Operators.SEMICOLON
  }),
  test: (context, data) => REGEX_OPERATOR_SEMICOLON_TEST.test(data)
}

export default OperatorSemicolon
