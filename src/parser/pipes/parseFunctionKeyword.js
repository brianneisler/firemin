import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import FunctionKeyword from '../nodes/FunctionKeyword'

const parseFunctionKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = FunctionKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseFunctionKeyword
