import { IDENTIFIER } from '../../constants/TokenTypes'

const REGEX_IDENTIFIER_TEST = /^[a-zA-Z_]/
const REGEX_IDENTIFIER_TOKEN = /^[a-zA-Z_][a-zA-Z0-9_]*/

const Identifier = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_IDENTIFIER_TOKEN)
    return {
      length: match.length,
      type: IDENTIFIER,
      value: match
    }
  },
  test: (context, data) => REGEX_IDENTIFIER_TEST.test(data)
}

export default Identifier
