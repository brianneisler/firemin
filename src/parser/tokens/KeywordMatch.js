import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_MATCH_TEST = new RegExp(
  `^${Keywords.MATCH}([^a-zA-Z0-9_]|$)`
)

const KeywordMatch = {
  parse: () => ({
    length: Keywords.MATCH.length,
    type: TokenTypes.KEYWORD_MATCH,
    value: Keywords.MATCH
  }),
  test: (context, data) => REGEX_KEYWORD_MATCH_TEST.test(data)
}

export default KeywordMatch
