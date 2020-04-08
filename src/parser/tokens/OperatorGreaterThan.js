import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_GREATER_THAN_TEST = /^>([^=]|$)/

const OperatorGreaterThan = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_GREATER_THAN,
    value: Operators.GREATER_THAN
  }),
  test: (context, data) => REGEX_OPERATOR_GREATER_THAN_TEST.test(data)
}

export default OperatorGreaterThan
