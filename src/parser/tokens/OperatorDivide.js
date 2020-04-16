import { Operators, TokenTypes } from '../../constants'

const REGEX_OPERATOR_DIVIDE_TEST = /^\//

const OperatorDivide = {
  parse: () => ({
    length: 1,
    type: TokenTypes.OPERATOR_DIVIDE,
    value: Operators.DIVIDE
  }),
  test: (context, data) => REGEX_OPERATOR_DIVIDE_TEST.test(data)
}

export default OperatorDivide
