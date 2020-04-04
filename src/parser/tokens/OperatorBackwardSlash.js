import { OPERATOR_BACKWARD_SLASH } from '../../constants/TokenTypes'

const REGEX_OPERATOR_BACKWARD_SLASH_TEST = /^\\/

const OperatorBackwardSlash = {
  parse: () => ({
    length: 1,
    type: OPERATOR_BACKWARD_SLASH,
    value: '\\'
  }),
  test: (context, data) => REGEX_OPERATOR_BACKWARD_SLASH_TEST.test(data)
}

export default OperatorBackwardSlash
