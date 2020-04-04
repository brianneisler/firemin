import { OPERATOR_LESS_THAN } from '../../constants/TokenTypes'

const REGEX_OPERATOR_LESS_THAN_TEST = /^<([^=]|$)/

const OperatorLessThan = {
  parse: () => ({
    length: 1,
    type: OPERATOR_LESS_THAN,
    value: '<'
  }),
  test: (context, data) => REGEX_OPERATOR_LESS_THAN_TEST.test(data)
}

export default OperatorLessThan
