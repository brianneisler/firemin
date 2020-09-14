import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_ALLOW_TEST = new RegExp(
  `^${Keywords.ALLOW}([^a-zA-Z0-9_]|$)`
)

const KeywordAllow = {
  parse: () => ({
    length: Keywords.ALLOW.length,
    type: TokenTypes.KEYWORD_ALLOW,
    value: Keywords.ALLOW
  }),
  test: (context, data) => REGEX_KEYWORD_ALLOW_TEST.test(data)
}

export default KeywordAllow
