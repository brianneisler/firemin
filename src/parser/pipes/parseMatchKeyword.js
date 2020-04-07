import { append, slice } from 'ramda'
import MatchKeyword from '../nodes/MatchKeyword'
import generateTokenList from '../../generator/generateTokenList'

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
