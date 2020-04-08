import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_RETURN_TEST = new RegExp(`^${Keywords.RETURN}([^a-zA-Z0-9_]|$)`)

const KeywordReturn = {
  parse: () => ({
    length: Keywords.RETURN.length,
    type: TokenTypes.KEYWORD_RETURN,
    value: Keywords.RETURN
  }),
  test: (context, data) => REGEX_KEYWORD_RETURN_TEST.test(data)
}

export default KeywordReturn
