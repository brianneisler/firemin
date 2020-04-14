import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_AT_SIGN_TEST = /^@/

const OperatorAtSign = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_AT_SIGN,
    value: Operators.AT_SIGN
  }),
  test: (context, data) => REGEX_OPERATOR_AT_SIGN_TEST.test(data)
}

export default OperatorAtSign
