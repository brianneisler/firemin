import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_AMPERSAND_TEST = /^&([^&]|$)/

const OperatorAmpersand = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_AMPERSAND,
    value: Operators.AMPERSAND
  }),
  test: (context, data) => REGEX_OPERATOR_AMPERSAND_TEST.test(data)
}

export default OperatorAmpersand
