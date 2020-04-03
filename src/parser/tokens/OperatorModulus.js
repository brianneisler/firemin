import { OPERATOR_MODULUS } from '../../constants/TokenTypes'

const REGEX_OPERATOR_MODULUS_TEST = /^%/

const OperatorModulus = {
  parse: () => ({
    length: 1,
    type: OPERATOR_MODULUS,
    value: '%'
  }),
  test: (data) => REGEX_OPERATOR_MODULUS_TEST.test(data)
}

export default OperatorModulus
