import { WHITESPACE } from '../../constants/TokenTypes'

const REGEX_WHITESPACE_TEST = /^\s/
const REGEX_WHITESPACE_TOKEN = /^\s+/

const Whitespace = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_WHITESPACE_TOKEN)
    return {
      length: match.length,
      type: WHITESPACE,
      value: match
    }
  },
  test: (context, data) => REGEX_WHITESPACE_TEST.test(data)
}

export default Whitespace
