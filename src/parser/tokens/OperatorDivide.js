import { OPERATOR_DIVIDE } from '../../constants/TokenTypes'

const REGEX_OPERATOR_DIVIDE_TEST = /^\//

const OperatorDivide = {
  parse: () => ({
    length: 1,
    type: OPERATOR_DIVIDE,
    value: '/'
  }),
  test: (data) => REGEX_OPERATOR_DIVIDE_TEST.test(data)
}

export default OperatorDivide
