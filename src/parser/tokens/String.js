import { STRING } from '../../constants/TokenTypes'

const REGEX_STRING_TEST = /^['"]/
const REGEX_STRING_TOKEN = /^("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')/

const String = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_STRING_TOKEN)
    return {
      length: match.length,
      type: STRING,
      value: match
    }
  },
  test: (context, data) => REGEX_STRING_TEST.test(data)
}

export default String
