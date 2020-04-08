import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_DOLLAR_SIGN_TEST = /^\$/

const OperatorDollarSign = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_DOLLAR_SIGN,
    value: Operators.DOLLAR_SIGN
  }),
  test: (context, data) => REGEX_OPERATOR_DOLLAR_SIGN_TEST.test(data)
}

export default OperatorDollarSign
