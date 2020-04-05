import { append, slice } from 'ramda'
import LetKeyword from '../nodes/LetKeyword'
import generateTokenList from '../../generator/generateTokenList'

const parseLetKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = LetKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    keyword,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseLetKeyword
