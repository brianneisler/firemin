import { OPERATOR_INEQUALITY } from '../../constants/TokenTypes'

const REGEX_OPERATOR_INEQUALITY_TEST = /^\!=/

const OperatorInequality = {
  parse: () => ({
    length: 2,
    type: OPERATOR_INEQUALITY,
    value: '!='
  }),
  test: (data) => REGEX_OPERATOR_INEQUALITY_TEST.test(data)
}

export default OperatorInequality
