import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_MODULUS_TEST = /^%/

const OperatorModulus = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_MODULUS,
    value: Operators.MODULUS
  }),
  test: (context, data) => REGEX_OPERATOR_MODULUS_TEST.test(data)
}

export default OperatorModulus
