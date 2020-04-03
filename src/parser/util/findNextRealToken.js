import { TokenTypes } from '../../constants'
import { find } from 'ramda'

const findNextRealToken = find(
  (token) => token.type !== TokenTypes.WHITESPACE && token.type !== TokenTypes.COMMENT
)

export default findNextRealToken
