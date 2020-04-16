import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_LESS_THAN_TEST = /^<([^=]|$)/

const OperatorLessThan = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_LESS_THAN,
    value: Operators.LESS_THAN
  }),
  test: (context, data) => REGEX_OPERATOR_LESS_THAN_TEST.test(data)
}

export default OperatorLessThan
