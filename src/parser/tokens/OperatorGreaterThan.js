import { OPERATOR_GREATER_THAN } from '../../constants/TokenTypes'

const REGEX_OPERATOR_GREATER_THAN_TEST = /^>([^=]|$)/

const OperatorGreaterThan = {
  parse: () => ({
    length: 1,
    type: OPERATOR_GREATER_THAN,
    value: '>'
  }),
  test: (context, data) => REGEX_OPERATOR_GREATER_THAN_TEST.test(data)
}

export default OperatorGreaterThan
