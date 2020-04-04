import { NUMBER } from '../../constants/TokenTypes'

const REGEX_NUMBER_TEST = /^[0-9]/
const REGEX_NUMBER_TOKEN = /^[0-9]+(\.[0-9]+)?/

const Number = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_NUMBER_TOKEN)
    return {
      length: match.length,
      type: NUMBER,
      value: match
    }
  },
  test: (context, data) => REGEX_NUMBER_TEST.test(data)
}

export default Number
