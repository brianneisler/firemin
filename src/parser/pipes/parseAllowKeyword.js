import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import AllowKeyword from '../nodes/AllowKeyword'

const parseAllowKeyword = (props) => {
  const { children, context, tokenList } = props
  const keyword = AllowKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...props,
    children: append(keyword, children),
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseAllowKeyword
