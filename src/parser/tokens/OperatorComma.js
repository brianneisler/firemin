import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_COMMA_TEST = /^,/

const OperatorComma = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_COMMA,
    value: Operators.COMMA
  }),
  test: (context, data) => REGEX_OPERATOR_COMMA_TEST.test(data)
}

export default OperatorComma
