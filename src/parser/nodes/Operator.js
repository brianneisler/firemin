import { slice } from 'ramda'
import generateTokenList from '../../generator/generateTokenList'
import parseNextNode from '../util/parseNextNode'
import testNextNode from '../util/testNextNode'

const Operator = {
  parse: (context, tokenList, prevExpression = null) => {
    let operator = parseNextNode(context.Operators, context, tokenList, prevExpression)
    let parsedTokenList = generateTokenList(context, { ast: operator })
    let nextTokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    while (testNextNode(context.Operators, context, nextTokenList, operator)) {
      operator = parseNextNode(context.Operators, context, nextTokenList, operator)
      parsedTokenList = generateTokenList(context, { ast: operator })
      nextTokenList = slice(parsedTokenList.size, tokenList.size, tokenList)
    }
    return operator
  },
  test: (context, tokenList, prevExpression = null) =>
    testNextNode(context.Operators, context, tokenList, prevExpression)
}

export default Operator
