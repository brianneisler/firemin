import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_GREATER_THAN_EQUAL_TEST = /^>=/

const OperatorGreaterThanEqual = {
  parse: () => ({
    length: 2,
    type: TokenTypes.OPERATOR_GREATER_THAN_EQUAL,
    value: Operators.GREATER_THAN_EQUAL
  }),
  test: (context, data) => REGEX_OPERATOR_GREATER_THAN_EQUAL_TEST.test(data)
}

export default OperatorGreaterThanEqual
