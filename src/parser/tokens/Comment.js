import { COMMENT } from '../../constants/TokenTypes'

const REGEX_COMMENT_TEST = /^\/\//
const REGEX_COMMENT_TOKEN = /^\/\/.*(\r\n?|\n)/

const Comment = {
  parse: (context, data) => {
    const [match] = data.match(REGEX_COMMENT_TOKEN)
    return {
      length: match.length,
      type: COMMENT,
      value: match
    }
  },
  test: (context, data) => REGEX_COMMENT_TEST.test(data)
}

export default Comment
