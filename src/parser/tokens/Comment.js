import { COMMENT } from '../../constants/TOKEN_TYPES'

const REGEX_COMMENT_TEST = /^\/\//
const REGEX_COMMENT_TOKEN = /^\/\/.*(\r\n?|\n)/

const Comment = {
  parse: (data) => {
    const [match] = data.match(REGEX_COMMENT_TOKEN)
    return {
      length: match.length,
      type: COMMENT,
      value: match
    }
  },
  test: (data) => REGEX_COMMENT_TEST.test(data)
}

export default Comment
