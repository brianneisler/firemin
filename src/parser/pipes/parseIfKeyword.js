import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import IfKeyword from '../nodes/IfKeyword'

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
