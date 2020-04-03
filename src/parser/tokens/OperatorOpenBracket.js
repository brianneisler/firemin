import { OPERATOR_OPEN_BRACKET } from '../../constants/TokenTypes'

const REGEX_OPERATOR_OPEN_BRACKET_TEST = /^\[/

const OperatorOpenBracket = {
  parse: () => ({
    length: 1,
    type: OPERATOR_OPEN_BRACKET,
    value: '['
  }),
  test: (data) => REGEX_OPERATOR_OPEN_BRACKET_TEST.test(data)
}

export default OperatorOpenBracket
