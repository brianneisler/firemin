import { append, slice } from 'ramda'
import Keyword from '../nodes/Keyword'
import generateTokenList from '../../generator/generateTokenList'

const parseKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = Keyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseKeyword
