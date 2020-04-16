import { append, slice } from 'ramda'
import IfKeyword from '../nodes/IfKeyword'
import generateTokenList from '../../generator/generateTokenList'

const parseIfKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = IfKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseIfKeyword
