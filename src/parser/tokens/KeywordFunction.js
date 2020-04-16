import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_FUNCTION_TEST = new RegExp(`^${Keywords.FUNCTION}([^a-zA-Z0-9_]|$)`)

const KeywordFunction = {
  parse: () => ({
    length: Keywords.FUNCTION.length,
    type: TokenTypes.KEYWORD_FUNCTION,
    value: Keywords.FUNCTION
  }),
  test: (context, data) => REGEX_KEYWORD_FUNCTION_TEST.test(data)
}

export default KeywordFunction
