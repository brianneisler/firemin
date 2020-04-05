import { append, slice } from 'ramda'
import AllowKeyword from '../nodes/AllowKeyword'
import generateTokenList from '../../generator/generateTokenList'

const parseAllowKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = AllowKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    keyword,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseAllowKeyword
