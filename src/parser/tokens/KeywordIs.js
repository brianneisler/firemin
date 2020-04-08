import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_IS_TEST = new RegExp(`^${Keywords.IS}([^a-zA-Z0-9_]|$)`)

const KeywordIs = {
  parse: () => ({
    length: Keywords.IS.length,
    type: TokenTypes.KEYWORD_IS,
    value: Keywords.IS
  }),
  test: (context, data) => REGEX_KEYWORD_IS_TEST.test(data)
}

export default KeywordIs
