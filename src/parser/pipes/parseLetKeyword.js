import { append, slice } from 'ramda'

import generateTokenList from '../../generator/generateTokenList'
import LetKeyword from '../nodes/LetKeyword'

const parseLetKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = LetKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    context,
    keyword,
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList)
  }
}

export default parseLetKeyword
