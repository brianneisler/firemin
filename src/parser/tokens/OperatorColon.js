import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_COLON_TEST = /^:/

const OperatorColon = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_COLON,
    value: Operators.COLON
  }),
  test: (context, data) => REGEX_OPERATOR_COLON_TEST.test(data)
}

export default OperatorColon
