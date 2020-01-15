import { OPERATOR_INFINITY } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_INFINITY_TEST = /^∞/

const OperatorInfinity = {
  parse: () => ({
    length: 1,
    type: OPERATOR_INFINITY,
    value: '∞'
  }),
  test: (data) => REGEX_OPERATOR_INFINITY_TEST.test(data)
}

export default OperatorInfinity
