import { append, slice } from 'ramda'
import IsKeyword from '../nodes/IsKeyword'
import generateTokenList from '../../generator/generateTokenList'

const parseIsKeyword = ({ children, context, tokenList, ...rest }) => {
  const keyword = IsKeyword.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: keyword })
  return {
    ...rest,
    children: append(keyword, children),
    keyword,
    tokenList: slice(0, parsedTokenList.size, tokenList)
  }
}

export default parseIsKeyword
