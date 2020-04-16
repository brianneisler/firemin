import { append, slice } from 'ramda'
import Word from '../nodes/Word'
import generateTokenList from '../../generator/generateTokenList'

const parseWord = (props) => {
  const { children, context, tokenList } = props
  const word = Word.parse(context, tokenList)
  const parsedTokenList = generateTokenList(context, { ast: word })
  return {
    ...props,
    children: append(word, children),
    tokenList: slice(parsedTokenList.size, tokenList.size, tokenList),
    word
  }
}

export default parseWord
