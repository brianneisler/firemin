import { BYTES } from '../../constants/TokenTypes'

const REGEX_BYTES_TEST = /^b['"]/
const REGEX_BYTES_TOKEN = /^b("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')/

const Bytes = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_BYTES_TOKEN)
    return {
      length: match.length,
      type: BYTES,
      value: match
    }
  },
  test: (context, data) => REGEX_BYTES_TEST.test(data)
}

export default Bytes
