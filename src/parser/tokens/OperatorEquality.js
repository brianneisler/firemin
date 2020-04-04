import { OPERATOR_EQUALITY } from '../../constants/TokenTypes'

const REGEX_OPERATOR_EQUALITY_TEST = /^==/

const OperatorEquality = {
  parse: () => ({
    length: 2,
    type: OPERATOR_EQUALITY,
    value: '=='
  }),
  test: (context, data) => REGEX_OPERATOR_EQUALITY_TEST.test(data)
}

export default OperatorEquality
