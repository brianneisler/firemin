import { OPERATOR_COLON } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_COLON_TEST = /^:/

const OperatorColon = {
  parse: () => ({
    length: 1,
    type: OPERATOR_COLON,
    value: ':'
  }),
  test: (data) => REGEX_OPERATOR_COLON_TEST.test(data)
}

export default OperatorColon
