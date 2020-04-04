import { OPERATOR_DOT } from '../../constants/TokenTypes'

const REGEX_OPERATOR_DOT_TEST = /^\./

const OperatorDot = {
  parse: () => ({
    length: 1,
    type: OPERATOR_DOT,
    value: '.'
  }),
  test: (context, data) => REGEX_OPERATOR_DOT_TEST.test(data)
}

export default OperatorDot
