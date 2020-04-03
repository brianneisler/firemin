import { OPERATOR_COMMA } from '../../constants/TokenTypes'

const REGEX_OPERATOR_COMMA_TEST = /^,/

const OperatorComma = {
  parse: () => ({
    length: 1,
    type: OPERATOR_COMMA,
    value: ','
  }),
  test: (data) => REGEX_OPERATOR_COMMA_TEST.test(data)
}

export default OperatorComma
