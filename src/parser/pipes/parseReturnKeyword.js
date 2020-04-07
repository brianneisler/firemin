import { append, slice } from 'ramda'
import ReturnKeyword from '../nodes/ReturnKeyword'
import generateTokenList from '../../generator/generateTokenList'

const parseReturnKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = ReturnKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseReturnKeyword
