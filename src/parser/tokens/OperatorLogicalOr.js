import { OPERATOR_LOGICAL_OR } from '../../constants/TokenTypes'

const REGEX_OPERATOR_LOGICAL_OR_TEST = /^\|\|/

const OperatorLogicalOr = {
  parse: () => ({
    length: 2,
    type: OPERATOR_LOGICAL_OR,
    value: '||'
  }),
  test: (data) => REGEX_OPERATOR_LOGICAL_OR_TEST.test(data)
}

export default OperatorLogicalOr
