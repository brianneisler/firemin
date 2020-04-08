import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_BACKWARD_SLASH_TEST = /^\\/

const OperatorBackwardSlash = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_BACKWARD_SLASH,
    value: Operators.BACKWARD_SLASH
  }),
  test: (context, data) => REGEX_OPERATOR_BACKWARD_SLASH_TEST.test(data)
}

export default OperatorBackwardSlash
