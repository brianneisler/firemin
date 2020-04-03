import { OPERATOR_GREATER_THAN_EQUAL } from '../../constants/TokenTypes'

const REGEX_OPERATOR_GREATER_THAN_EQUAL_TEST = /^>=/

const OperatorGreaterThanEqual = {
  parse: () => ({
    length: 2,
    type: OPERATOR_GREATER_THAN_EQUAL,
    value: '>='
  }),
  test: (data) => REGEX_OPERATOR_GREATER_THAN_EQUAL_TEST.test(data)
}

export default OperatorGreaterThanEqual
