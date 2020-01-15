import { OPERATOR_FORWARD_SLASH } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_FORWARD_SLASH_TEST = /^\//

const OperatorForwardSlash = {
  parse: () => ({
    length: 1,
    type: OPERATOR_FORWARD_SLASH,
    value: '/'
  }),
  test: (data) => REGEX_OPERATOR_FORWARD_SLASH_TEST.test(data)
}

export default OperatorForwardSlash
