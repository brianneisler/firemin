import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import MatchKeyword from '../nodes/MatchKeyword'

const parseMatchKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = MatchKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseMatchKeyword
