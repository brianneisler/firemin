import { Keywords, TokenTypes } from '../../constants'
import { join, values } from 'ramda'

const REGEX_IDENTIFIER_TEST = new RegExp(
  `^(?!${join('|', values(Keywords))})[a-zA-Z_][a-zA-Z0-9_]*`
)
const REGEX_IDENTIFIER_TOKEN = new RegExp(
  `^(?!${join('|', values(Keywords))})[a-zA-Z_][a-zA-Z0-9_]*`
)

const Identifier = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_IDENTIFIER_TOKEN)
    return {
      length: match.length,
      type: TokenTypes.IDENTIFIER,
      value: match
    }
  },
  test: (context, data) => REGEX_IDENTIFIER_TEST.test(data)
}

export default Identifier
