import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_INEQUALITY_TEST = /^\!=/

const OperatorInequality = {
  parse: () => ({
    length: 2,
    type: TokenTypes.OPERATOR_INEQUALITY,
    value: Operators.INEQUALITY
  }),
  test: (context, data) => REGEX_OPERATOR_INEQUALITY_TEST.test(data)
}

export default OperatorInequality
