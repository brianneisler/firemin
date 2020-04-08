import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_DOT_TEST = /^\./

const OperatorDot = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_DOT,
    value: Operators.DOT
  }),
  test: (context, data) => REGEX_OPERATOR_DOT_TEST.test(data)
}

export default OperatorDot
