import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_IF_TEST = new RegExp(`^${Keywords.IF}([^a-zA-Z0-9_]|$)`)

const KeywordIf = {
  parse: () => ({
    length: Keywords.IF.length,
    type: TokenTypes.KEYWORD_IF,
    value: Keywords.IF
  }),
  test: (context, data) => REGEX_KEYWORD_IF_TEST.test(data)
}

export default KeywordIf
