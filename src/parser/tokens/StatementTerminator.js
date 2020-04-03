import { STATEMENT_TERMINATOR } from '../../constants/TokenTypes'

const REGEX_STATEMENT_TERMINATOR_TEST = /^;/

const StatementTerminator = {
  parse: () => ({
    length: 1,
    type: STATEMENT_TERMINATOR,
    value: ';'
  }),
  test: (data) => REGEX_STATEMENT_TERMINATOR_TEST.test(data)
}

export default StatementTerminator
