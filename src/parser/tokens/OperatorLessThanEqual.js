import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_LESS_THAN_EQUAL_TEST = /^<=/

const OperatorLessThanEqual = {
  parse: () => ({
    length: 2,
    type: TokenTypes.OPERATOR_LESS_THAN_EQUAL,
    value: Operators.LESS_THAN_EQUAL
  }),
  test: (context, data) => REGEX_OPERATOR_LESS_THAN_EQUAL_TEST.test(data)
}

export default OperatorLessThanEqual
