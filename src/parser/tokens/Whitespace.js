import { WHITESPACE } from '../../constants/TOKEN_TYPES'

const REGEX_WHITESPACE_TEST = /^\s/
const REGEX_WHITESPACE_TOKEN = /^\s+/

const Whitespace = {
  parse: (data) => {
    const [match] = data.match(REGEX_WHITESPACE_TOKEN)
    return {
      length: match.length,
      type: WHITESPACE,
      value: match
    }
  },
  test: (data) => REGEX_WHITESPACE_TEST.test(data)
}

export default Whitespace
