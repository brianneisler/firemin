import { OPERATOR_CLOSE_BRACKET } from '../../constants/TokenTypes'

const REGEX_OPERATOR_CLOSE_BRACKET_TEST = /^\]/

const OperatorCloseBracket = {
  parse: () => ({
    length: 1,
    type: OPERATOR_CLOSE_BRACKET,
    value: ']'
  }),
  test: (data) => REGEX_OPERATOR_CLOSE_BRACKET_TEST.test(data)
}

export default OperatorCloseBracket
