import { slice } from 'ramda'
import generateTokenList from '../../generator/generateTokenList'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Keyword = {
  parse: (context, tokenList, prevExpression = null) => {
    let keyword = parseNextNode(context.Keywords, context, tokenList, prevExpression)
    let parsedTokenList = generateTokenList(context, { ast: keyword })
    let nextTokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    while (testNextNode(context.Keywords, context, nextTokenList, keyword)) {
      keyword = parseNextNode(context.Keywords, context, nextTokenList, keyword)
      parsedTokenList = generateTokenList(context, { ast: keyword })
      nextTokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    }
    return keyword
  },
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Keywords, context, tokenList, prevExpression)
}

export default Keyword
