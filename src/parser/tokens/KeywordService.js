import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_SERVICE_TEST = new RegExp(
  `^${Keywords.SERVICE}([^a-zA-Z0-9_]|$)`
)

const KeywordService = {
  parse: () => ({
    length: Keywords.SERVICE.length,
    type: TokenTypes.KEYWORD_SERVICE,
    value: Keywords.SERVICE
  }),
  test: (context, data) => REGEX_KEYWORD_SERVICE_TEST.test(data)
}

export default KeywordService
