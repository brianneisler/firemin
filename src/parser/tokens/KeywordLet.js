import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_LET_TEST = new RegExp(`^${Keywords.LET}([^a-zA-Z0-9_]|$)`)

const KeywordLet = {
  parse: () => ({
    length: Keywords.LET.length,
    type: TokenTypes.KEYWORD_LET,
    value: Keywords.LET
  }),
  test: (context, data) => REGEX_KEYWORD_LET_TEST.test(data)
}

export default KeywordLet
