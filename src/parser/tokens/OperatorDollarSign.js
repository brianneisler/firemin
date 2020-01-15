import { OPERATOR_DOLLAR_SIGN } from '../../constants/TOKEN_TYPES'

const REGEX_OPERATOR_DOLLAR_SIGN_TEST = /^\$/

const OperatorDollarSign = {
  parse: () => ({
    length: 1,
    type: OPERATOR_DOLLAR_SIGN,
    value: '$'
  }),
  test: (data) => REGEX_OPERATOR_DOLLAR_SIGN_TEST.test(data)
}

export default OperatorDollarSign
