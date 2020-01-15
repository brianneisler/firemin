import { OPERATOR_MULTIPLY } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_MULTIPLY_TEST = /^\*/

const OperatorMultiply = {
  parse: () => ({
    length: 1,
    type: OPERATOR_MULTIPLY,
    value: '*'
  }),
  test: (data) => REGEX_OPERATOR_MULTIPLY_TEST.test(data)
}

export default OperatorMultiply
