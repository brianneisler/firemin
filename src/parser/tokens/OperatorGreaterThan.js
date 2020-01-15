import { OPERATOR_GREATER_THAN } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_GREATER_THAN_TEST = /^>([^=]|$)/

const OperatorGreaterThan = {
  parse: () => ({
    length: 1,
    type: OPERATOR_GREATER_THAN,
    value: '>'
  }),
  test: (data) => REGEX_OPERATOR_GREATER_THAN_TEST.test(data)
}

export default OperatorGreaterThan
