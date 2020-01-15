import { OPERATOR_LESS_THAN_EQUAL } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_LESS_THAN_EQUAL_TEST = /^<=/

const OperatorLessThanEqual = {
  parse: () => ({
    length: 2,
    type: OPERATOR_LESS_THAN_EQUAL,
    value: '<='
  }),
  test: (data) => REGEX_OPERATOR_LESS_THAN_EQUAL_TEST.test(data)
}

export default OperatorLessThanEqual
